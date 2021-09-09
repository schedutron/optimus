// +build !unit_test

package postgres

import (
	"context"
	"os"
	"sort"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
	"github.com/odpf/optimus/mock"
	"github.com/odpf/optimus/models"
	"github.com/stretchr/testify/assert"
)

func TestJobRunRepository(t *testing.T) {
	projectSpec := models.ProjectSpec{
		ID:   uuid.Must(uuid.NewRandom()),
		Name: "t-optimus-id",
		Config: map[string]string{
			"bucket": "gs://some_folder",
		},
	}
	namespaceSpec := models.NamespaceSpec{
		ID:          uuid.Must(uuid.NewRandom()),
		Name:        "dev-team-1",
		ProjectSpec: projectSpec,
	}

	gTask := "g-task"
	tTask := "t-task"
	execUnit1 := new(mock.BasePlugin)
	execUnit1.On("PluginInfo").Return(&models.PluginInfoResponse{
		Name: gTask,
	}, nil)
	execUnit2 := new(mock.BasePlugin)
	execUnit2.On("PluginInfo").Return(&models.PluginInfoResponse{
		Name: tTask,
	}, nil)

	pluginRepo := new(mock.SupportedPluginRepo)
	pluginRepo.On("GetByName", gTask).Return(&models.Plugin{Base: execUnit1}, nil)
	pluginRepo.On("GetByName", tTask).Return(&models.Plugin{Base: execUnit2}, nil)
	adapter := NewAdapter(pluginRepo)

	jobConfigs := []models.JobSpec{
		{
			ID:   uuid.Must(uuid.NewRandom()),
			Name: "g-optimus-id",
			Task: models.JobSpecTask{
				Unit: &models.Plugin{Base: execUnit1},
				Config: []models.JobSpecConfigItem{
					{
						Name: "do", Value: "this",
					},
				},
			},
			Assets: *models.JobAssets{}.New(
				[]models.JobSpecAsset{
					{
						Name:  "query.sql",
						Value: "select * from 1",
					},
				}),
		},
		{
			Name: "",
		},
		{
			ID:   uuid.Must(uuid.NewRandom()),
			Name: "t-optimus-id",
			Task: models.JobSpecTask{
				Unit: &models.Plugin{Base: execUnit2},
				Config: []models.JobSpecConfigItem{
					{
						Name: "do", Value: "this",
					},
				},
			},
		},
	}

	unitData := models.GenerateDestinationRequest{
		Config: models.PluginConfigs{}.FromJobSpec(jobConfigs[0].Task.Config),
		Assets: models.PluginAssets{}.FromJobSpec(jobConfigs[0].Assets),
	}
	execUnit1.On("GenerateDestination", context.TODO(), unitData).Return(models.GenerateDestinationResponse{Destination: "p.d.t"}, nil)
	unitData2 := models.GenerateDestinationRequest{
		Config: models.PluginConfigs{}.FromJobSpec(jobConfigs[1].Task.Config),
		Assets: models.PluginAssets{}.FromJobSpec(jobConfigs[1].Assets),
	}
	execUnit2.On("GenerateDestination", context.TODO(), unitData2).Return(models.GenerateDestinationResponse{Destination: "p.d.t"}, nil)

	DBSetup := func() *gorm.DB {
		dbURL, ok := os.LookupEnv("TEST_OPTIMUS_DB_URL")
		if !ok {
			panic("unable to find TEST_OPTIMUS_DB_URL env var")
		}
		dbConn, err := Connect(dbURL, 1, 1)
		if err != nil {
			panic(err)
		}
		m, err := NewHTTPFSMigrator(dbURL)
		if err != nil {
			panic(err)
		}
		if err := m.Drop(); err != nil {
			panic(err)
		}
		if err := Migrate(dbURL); err != nil {
			panic(err)
		}

		hash, _ := models.NewApplicationSecret("32charshtesthashtesthashtesthash")
		prepo := NewProjectRepository(dbConn, hash)
		assert.Nil(t, prepo.Save(projectSpec))

		projectJobSpecRepo := NewProjectJobSpecRepository(dbConn, projectSpec, adapter)
		jrepo := NewJobSpecRepository(dbConn, namespaceSpec, projectJobSpecRepo, adapter)
		assert.Nil(t, jrepo.Save(jobConfigs[0]))
		assert.Equal(t, "task unit cannot be empty", jrepo.Save(jobConfigs[1]).Error())
		return dbConn
	}

	testInstanceSpecs := []models.InstanceSpec{
		{
			ID:         uuid.Must(uuid.NewRandom()),
			Name:       "do-this",
			Type:       models.InstanceTypeTask,
			ExecutedAt: time.Date(2020, 11, 11, 1, 0, 0, 0, time.UTC),
			Status:     models.RunStateSuccess,
			Data: []models.InstanceSpecData{
				{Name: "dstart", Value: "2020-01-02", Type: models.InstanceDataTypeEnv},
			},
		},
		{
			ID:   uuid.Must(uuid.NewRandom()),
			Name: "do-that",
			Type: models.InstanceTypeTask,
		},
	}

	testSpecs := []models.JobRun{
		{
			ID:          uuid.Must(uuid.NewRandom()),
			Spec:        jobConfigs[0],
			Trigger:     models.TriggerManual,
			Status:      models.RunStateRunning,
			Instances:   testInstanceSpecs,
			ScheduledAt: time.Date(2020, 11, 11, 0, 0, 0, 0, time.UTC),
		},
		{
			ID:          uuid.Must(uuid.NewRandom()),
			Spec:        jobConfigs[0],
			Trigger:     models.TriggerManual,
			Status:      models.RunStateRunning,
			ScheduledAt: time.Date(2020, 11, 11, 0, 0, 0, 0, time.UTC),
		},
	}

	t.Run("Insert", func(t *testing.T) {
		db := DBSetup()
		defer db.Close()

		var testModels []models.JobRun
		testModels = append(testModels, testSpecs...)

		repo := NewJobRunRepository(db, adapter)
		err := repo.Insert(namespaceSpec, testModels[1])
		assert.Nil(t, err)

		checkModel, ns, err := repo.GetByID(testModels[1].ID)
		assert.Nil(t, err)
		assert.Equal(t, testModels[1].Spec.Name, checkModel.Spec.Name)
		assert.Equal(t, testModels[1].ScheduledAt.Unix(), checkModel.ScheduledAt.Unix())
		assert.Equal(t, namespaceSpec.ID, ns.ID)

		err = repo.Insert(namespaceSpec, testModels[0])
		assert.Nil(t, err)

		checkModel, ns, err = repo.GetByID(testModels[0].ID)
		assert.Nil(t, err)
		assert.Equal(t, testModels[0].Spec.Name, checkModel.Spec.Name)
		assert.Equal(t, testModels[0].ScheduledAt.Unix(), checkModel.ScheduledAt.Unix())
		assert.Equal(t, namespaceSpec.ID, ns.ID)
		assert.Equal(t, len(testModels[0].Instances), len(checkModel.Instances))
		sort.Slice(testModels[0].Instances, func(i, j int) bool {
			return testModels[0].Instances[i].ID.String() < testModels[0].Instances[j].ID.String()
		})
		sort.Slice(checkModel.Instances, func(i, j int) bool {
			return checkModel.Instances[i].ID.String() < checkModel.Instances[j].ID.String()
		})
		assert.EqualValues(t, testModels[0].Instances[0].ID, checkModel.Instances[0].ID)
	})
	t.Run("Save", func(t *testing.T) {
		t.Run("should save and delete fresh runs correctly", func(t *testing.T) {
			db := DBSetup()
			defer db.Close()

			testModels := []models.JobRun{}
			testModels = append(testModels, testSpecs...)

			repo := NewJobRunRepository(db, adapter)
			err := repo.Save(namespaceSpec, testModels[0])
			assert.Nil(t, err)

			checkModel, _, err := repo.GetByID(testModels[0].ID)
			assert.Nil(t, err)
			assert.Equal(t, testModels[0].Spec.Name, checkModel.Spec.Name)
			assert.Equal(t, testModels[0].ScheduledAt.Unix(), checkModel.ScheduledAt.Unix())

			err = repo.Delete(testModels[0].ID)
			assert.Nil(t, err)

			err = repo.Save(namespaceSpec, testModels[0])
			assert.Nil(t, err)

			checkModel, _, err = repo.GetByID(testModels[0].ID)
			assert.Nil(t, err)
			assert.Equal(t, testModels[0].Spec.Name, checkModel.Spec.Name)
			assert.Equal(t, testModels[0].ScheduledAt.Unix(), checkModel.ScheduledAt.Unix())
		})
		t.Run("should upsert existing runs correctly", func(t *testing.T) {
			db := DBSetup()
			defer db.Close()

			testModels := []models.JobRun{}
			testModels = append(testModels, testSpecs...)

			repo := NewJobRunRepository(db, adapter)
			err := repo.Save(namespaceSpec, testModels[0])
			assert.Nil(t, err)

			checkModel, _, err := repo.GetByID(testModels[0].ID)
			assert.Nil(t, err)
			assert.Equal(t, testModels[0].Spec.Name, checkModel.Spec.Name)
			assert.Equal(t, testModels[0].ScheduledAt.Unix(), checkModel.ScheduledAt.Unix())

			// update resource
			testModels[0].ScheduledAt = testModels[0].ScheduledAt.Add(time.Nanosecond)

			err = repo.Save(namespaceSpec, testModels[0])
			assert.Nil(t, err)

			checkModel, _, err = repo.GetByID(testModels[0].ID)
			assert.Nil(t, err)
			assert.Equal(t, testModels[0].Spec.Name, checkModel.Spec.Name)
			assert.Equal(t, testModels[0].ScheduledAt.Add(time.Nanosecond).Unix(), checkModel.ScheduledAt.Unix())
		})
	})
	t.Run("ClearInstances", func(t *testing.T) {
		db := DBSetup()
		defer db.Close()

		var testModels []models.JobRun
		testModels = append(testModels, testSpecs...)

		repo := NewJobRunRepository(db, adapter)
		err := repo.Insert(namespaceSpec, testModels[0])
		assert.Nil(t, err)

		err = repo.ClearInstances(testModels[0].Spec.ID, testModels[0].ScheduledAt)
		assert.Nil(t, err)

		checkModel, _, err := repo.GetByID(testModels[0].ID)
		assert.Nil(t, err)
		assert.Equal(t, 0, len(checkModel.Instances))
	})
	t.Run("ClearInstance", func(t *testing.T) {
		db := DBSetup()
		defer db.Close()

		var testModels []models.JobRun
		testModels = append(testModels, testSpecs...)

		repo := NewJobRunRepository(db, adapter)
		err := repo.Insert(namespaceSpec, testModels[0])
		assert.Nil(t, err)

		err = repo.ClearInstance(testModels[0].ID, models.InstanceTypeTask, "do-this")
		assert.Nil(t, err)

		checkModel, _, err := repo.GetByID(testModels[0].ID)
		assert.Nil(t, err)
		assert.Equal(t, 1, len(checkModel.Instances))
	})
	t.Run("GetByStatus", func(t *testing.T) {
		db := DBSetup()
		defer db.Close()

		var testModels []models.JobRun
		testModels = append(testModels, testSpecs...)

		repo := NewJobRunRepository(db, adapter)
		err := repo.Insert(namespaceSpec, testModels[0])
		assert.Nil(t, err)

		runs, err := repo.GetByStatus(models.RunStateRunning)
		assert.Nil(t, err)
		assert.Equal(t, 1, len(runs))
	})
	t.Run("AddInstance", func(t *testing.T) {
		db := DBSetup()
		defer db.Close()

		var testModels []models.JobRun
		testModels = append(testModels, testSpecs...)

		repo := NewJobRunRepository(db, adapter)
		err := repo.Insert(namespaceSpec, testModels[1])
		assert.Nil(t, err)

		err = repo.AddInstance(namespaceSpec, testModels[1], testInstanceSpecs[0])
		assert.Nil(t, err)

		jr, _, err := repo.GetByID(testModels[1].ID)
		assert.Nil(t, err)
		assert.Equal(t, 1, len(jr.Instances))
	})
	t.Run("Clear", func(t *testing.T) {
		db := DBSetup()
		defer db.Close()

		var testModels []models.JobRun
		testModels = append(testModels, testSpecs...)

		repo := NewJobRunRepository(db, adapter)
		err := repo.Insert(namespaceSpec, testModels[0])
		assert.Nil(t, err)

		err = repo.Clear(testModels[0].ID)
		assert.Nil(t, err)

		jr, _, err := repo.GetByID(testModels[0].ID)
		assert.Nil(t, err)
		assert.Equal(t, 0, len(jr.Instances))
		assert.Equal(t, models.RunStatePending, jr.Status)
	})
}