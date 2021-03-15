package airflow

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"path/filepath"
	"strings"
	"time"

	"github.com/pkg/errors"
	"github.com/odpf/optimus/models"
	"github.com/odpf/optimus/store"
)

const (
	baseTemplateFilePath = "./templates/scheduler/airflow_1/base_dag.py"
	baseLibFilePath      = "./templates/scheduler/airflow_1/__lib.py"

	dagStatusUrl = "api/experimental/dags/%s/dag_runs"
)

type HttpClient interface {
	Do(req *http.Request) (*http.Response, error)
}

type scheduler struct {
	objWriter  store.ObjectWriter
	templateFS http.FileSystem

	httpClient HttpClient
}

func NewScheduler(lfs http.FileSystem, ow store.ObjectWriter, httpClient HttpClient) *scheduler {
	return &scheduler{
		templateFS: lfs,
		objWriter:  ow,
		httpClient: httpClient,
	}
}

func (a *scheduler) GetName() string {
	return "airflow"
}

func (a *scheduler) GetJobsDir() string {
	return "dags"
}

func (a *scheduler) GetJobsExtension() string {
	return ".py"
}

func (a *scheduler) GetTemplatePath() string {
	return baseTemplateFilePath
}

func (a *scheduler) Bootstrap(ctx context.Context, proj models.ProjectSpec) error {
	storagePath, ok := proj.Config[models.ProjectStoragePathKey]
	if !ok {
		return errors.Errorf("%s not configured for project %s", models.ProjectStoragePathKey, proj.Name)
	}
	p, err := url.Parse(storagePath)
	if err != nil {
		return err
	}

	switch p.Scheme {
	case "gs":
		return a.migrateLibFileInGCS(ctx, p.Hostname(), filepath.Join(p.Path, a.GetJobsDir(), filepath.Base(baseLibFilePath)))
	}

	return errors.Errorf("unsupported storage config %s in %s of project %s", storagePath, models.ProjectStoragePathKey, proj.Name)
}

func (a *scheduler) migrateLibFileInGCS(ctx context.Context, bucket, objDir string) (err error) {

	// copy lib file to GCS
	baseLibFile, err := a.templateFS.Open(baseLibFilePath)
	if err != nil {
		return err
	}
	defer baseLibFile.Close()

	// read file
	fileContent, err := ioutil.ReadAll(baseLibFile)
	if err != nil {
		return err
	}

	// copy to gcs
	dst, err := a.objWriter.NewWriter(ctx, bucket, objDir)
	if err != nil {
		return err
	}
	defer func() {
		if derr := dst.Close(); derr != nil {
			if err == nil {
				err = derr
			} else {
				err = errors.Wrap(err, derr.Error())
			}
		}
	}()

	_, err = io.Copy(dst, bytes.NewBuffer(fileContent))
	return
}

func (a *scheduler) GetJobStatus(ctx context.Context, projSpec models.ProjectSpec, jobName string) ([]models.JobStatus,
	error) {
	schdHost, ok := projSpec.Config[models.ProjectSchedulerHost]
	if !ok {
		return nil, errors.Errorf("scheduler host not set for %s", projSpec.Name)
	}
	schdHost = strings.Trim(schdHost, "/")

	fetchUrl := fmt.Sprintf(fmt.Sprintf("%s/%s", schdHost, dagStatusUrl), jobName)
	request, err := http.NewRequest(http.MethodGet, fetchUrl, nil)
	if err != nil {
		return nil, errors.Wrapf(err, "failed to build http request for %s", fetchUrl)
	}

	resp, err := a.httpClient.Do(request)
	if err != nil {
		return nil, errors.Wrapf(err, "failed to fetch airflow dag runs from %s", fetchUrl)
	}
	if resp.StatusCode != http.StatusOK {
		return nil, errors.Errorf("failed to fetch airflow dag runs from %s", fetchUrl)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, errors.Wrap(err, "failed to read airflow response")
	}

	//{
	//	"dag_id": "",
	//	"dag_run_url": "",
	//	"execution_date": "2020-03-25T02:00:00+00:00",
	//	"id": 1997,
	//	"run_id": "scheduled__2020-03-25T02:00:00+00:00",
	//	"start_date": "2020-06-01T16:32:58.489042+00:00",
	//	"state": "success"
	//},
	responseJson := []map[string]interface{}{}
	err = json.Unmarshal(body, &responseJson)
	if err != nil {
		return nil, errors.Wrapf(err, "json error: %s", string(body))
	}

	jobStatus := []models.JobStatus{}
	for _, status := range responseJson {
		_, ok1 := status["execution_date"]
		_, ok2 := status["state"]
		if !ok1 || !ok2 {
			return nil, errors.Errorf("failed to find required response fields %s in %s", jobName, status)
		}
		schdAt, err := time.Parse(models.InstanceScheduledAtTimeLayout, status["execution_date"].(string))
		if err != nil {
			return nil, errors.Errorf("error parsing date for %s, %s", jobName, status["execution_date"].(string))
		}
		jobStatus = append(jobStatus, models.JobStatus{
			ScheduledAt: schdAt,
			State:       models.JobStatusState(status["state"].(string)),
		})
	}

	return jobStatus, nil
}