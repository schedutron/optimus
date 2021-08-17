(self.webpackChunkoptimus=self.webpackChunkoptimus||[]).push([[999],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return h}});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(n),h=o,m=d["".concat(l,".").concat(h)]||d[h]||u[h]||i;return n?a.createElement(m,r(r({ref:t},p),{},{components:n})):a.createElement(m,r({ref:t},p))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,r[1]=s;for(var c=2;c<i;c++)r[c]=n[c];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4986:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var a=n(2122),o=n(9756),i=(n(7294),n(3905)),r=["components"],s={id:"overview",title:"Overview"},l=void 0,c={unversionedId:"concepts/overview",id:"concepts/overview",isDocsHomePage:!1,title:"Overview",description:"Optimus Project",source:"@site/docs/concepts/overview.md",sourceDirName:"concepts",slug:"/concepts/overview",permalink:"/optimus/concepts/overview",editUrl:"https://github.com/odpf/optimus/edit/master/docs/docs/concepts/overview.md",version:"current",lastUpdatedBy:"Kush",lastUpdatedAt:1629180206,formattedLastUpdatedAt:"8/17/2021",frontMatter:{id:"overview",title:"Overview"},sidebar:"docsSidebar",previous:{title:"Bigquery to bigquery transformation task",permalink:"/optimus/guides/task-bq2bq"},next:{title:"Architecture",permalink:"/optimus/concepts/architecture"}},p=[{value:"Optimus Project",id:"optimus-project",children:[]},{value:"Namespace",id:"namespace",children:[]},{value:"Optimus cli",id:"optimus-cli",children:[]},{value:"Job",id:"job",children:[]},{value:"Hook",id:"hook",children:[]},{value:"Job Specification",id:"job-specification",children:[]},{value:"Macros &amp; Templates",id:"macros--templates",children:[]},{value:"Configuration",id:"configuration",children:[]},{value:"Assets",id:"assets",children:[]},{value:"Scheduler",id:"scheduler",children:[]},{value:"Dependency Resolver",id:"dependency-resolver",children:[]},{value:"Priority Resolver",id:"priority-resolver",children:[]},{value:"Optimus Plugins",id:"optimus-plugins",children:[]},{value:"Datastore",id:"datastore",children:[]},{value:"Secret Management",id:"secret-management",children:[]},{value:"Replay &amp; Backups",id:"replay--backups",children:[]},{value:"Monitoring &amp; Alerting",id:"monitoring--alerting",children:[]}],u={toc:p};function d(e){var t=e.components,n=(0,o.Z)(e,r);return(0,i.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"optimus-project"},"Optimus Project"),(0,i.kt)("p",null,"A Project/Tenant represents a group of Jobs, Resources, Scheduler with the specified\nconfigurations and infrastructure. A Project contains multiple user created Namespaces,\nand each Namespace contains multiple Jobs/Hooks and configurations."),(0,i.kt)("h2",{id:"namespace"},"Namespace"),(0,i.kt)("p",null,"A Namespace represents a grouping of specified Jobs and Resources which can be accessible\nonly through the namespace owners. User may override the Project configuration or define\nconfiguration locally at the namespace level. A namespace always belongs to a Project.\nAll Namespaces of a Project share same infrastructure and the Scheduler. They share all\nthe accesses and secrets provided by the Project, however, they cannot access or modify\nthe Jobs and Datastore Resources of other namespaces."),(0,i.kt)("p",null,"A use case for Namespace could be when multiple teams want to re-use the existing\ninfrastructure but want to maintain their specifications like Jobs, Resources etc\nindependently. The namespace's name can be chosen by user or can be provided by the\nauthentication service."),(0,i.kt)("h2",{id:"optimus-cli"},"Optimus cli"),(0,i.kt)("p",null,"Optimus provides a cli used to start Optimus service using ",(0,i.kt)("inlineCode",{parentName:"p"},"serve")," command and a\nlot of other features like interacting with the remote/local optimus service, bootstrapping\nspecifications, validating, testing, etc. Although it is not necessary to use cli\nand GRPC/REST can also be used directly which is what CLI does internally for communication\nwith the service. "),(0,i.kt)("h2",{id:"job"},"Job"),(0,i.kt)("p",null,"A Job is the fundamental unit of the data pipeline which enables a data transformation\nin the warehouse of choice. A job has all the basic details required to perform a scheduled\noperation few of which are:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Schedule interval"),(0,i.kt)("li",{parentName:"ul"},"Date from when a transformation should start executing"),(0,i.kt)("li",{parentName:"ul"},"How much data this job will consume at every transformation")),(0,i.kt)("p",null,"Each job has a single base transformation, we call them ",(0,i.kt)("strong",{parentName:"p"},"Transformer")," or ",(0,i.kt)("strong",{parentName:"p"},"Task"),".\nSome examples of jobs include:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"BQ2BQTask - transformation from BigQuery to BigQuery in SQL"),(0,i.kt)("li",{parentName:"ol"},"SparkSQLTask - transformation from BQ/GCS to BQ/GCS in SparkSQL"),(0,i.kt)("li",{parentName:"ol"},"PySparkTask - transformation using python.")),(0,i.kt)("h2",{id:"hook"},"Hook"),(0,i.kt)("p",null,"Hooks are the operations that you might want to run before or after a Job. A hook is\nonly associated with a single parent although they can depend on other hooks within\nthe same job. There can be many or zero hooks for a Job as configured by the user.\nSome examples of hooks are:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Transporter(BQ/GCS to Kafka)"),(0,i.kt)("li",{parentName:"ol"},"Predator(Auditing & Profiling for BQ)"),(0,i.kt)("li",{parentName:"ol"},"BeastLagChecker"),(0,i.kt)("li",{parentName:"ol"},"Http Hooks"),(0,i.kt)("li",{parentName:"ol"},"Tableau view updates")),(0,i.kt)("p",null,"Each hook has its own set of configs and share the same asset folder as the base job.\nHook can inherit configurations from the base transformation or from a global configuration\nstore. "),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"The fundamental difference between a hook and a task is, task can have dependencies\nover other jobs inside the repository whereas hook can only depend on other hooks within\nthe job.")),(0,i.kt)("h2",{id:"job-specification"},"Job Specification"),(0,i.kt)("p",null,"Optimus has a specification repository that holds all the details required to\ndefine a scheduled operation. Repository has a fixed folder structure which is\nmaintained by Optimus CLI. Users can create and delete the jobs from the\nrepository using either optimus CLI or a simple text editor like\n",(0,i.kt)("a",{parentName:"p",href:"https://code.visualstudio.com/download"},"VSCode"),'. A sample command to create\na new job is "optimus create job", calling this will ask for a\nfew inputs which are required for the execution of this job and\nleave rest for the user to modify of its own eg, the SQL.'),(0,i.kt)("p",null,"If you're new to YAML and want to learn more, see ",(0,i.kt)("a",{parentName:"p",href:"https://learnxinyminutes.com/docs/yaml/"},"Learn YAML in Y minutes.")),(0,i.kt)("p",null,"Following is a sample job specification:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'# specification version, for now just keep it fixed unless optimus has any\n# breaking change\nversion: 1\n\n# unique name for the job, try to use simple ascii characters and less than 200 chars\n# to keep scheduler db\'s happy\nname: example_job\n\n# owner of the job\nowner: example@example.com\n\n# description of this job, what this do\ndescription: sample example job\n\n# configure when it should start, when the job should stop executing and what\n# interval scheduler should use for execution\nschedule:\n  # time format should be RFC3339\n  start_date: "2021-02-18"\n  end_date: "2021-02-25"\n  \n  # supports standard cron notations\n  interval: 0 3 * * *\n\n# extra modifiers to change the behavior of the job\nbehavior:\n  \n  # should the job wait for previous runs to finish successfully before executing\n  # next run, this will make it execute in sequence\n  depends_on_past: false\n  \n  # if start_date is set in the past, and catchup is true, it will allow scheduler\n  # to automatically backfill history executions till it reaches today\n  catch_up: true\n  \n  # retry behaviour of this job if it fails to successfully complete in first try\n  retry:\n    \n    # maximum number of tries before giving up, cannot be 0\n    count: 3\n    \n    # delay between retries\n    delay: "15m"\n    \n    # allow progressive longer waits between retries by using exponential backoff algorithm \n    # on retry delay (delay will be converted into seconds)\n    exponential_backoff: false\n  \n  # send a notification to routing channel based on an event\n  notify:\n    - # event to listen for\n      # possible options failure/sla_miss\n      on: failure\n      \n      # list of routes that will recieve the notification      \n      channel:\n        # email id of a user in slack\n        - slack://example@example.com\n        # slack channel\n        - slack://#optimus-devs\n        # slack user group\n        - slack://@optimus-devs\n      \n      # additional configs required for certain events like sla_miss \n      config:\n        - duration: 2h\n    \n# transformation task configuration for this job\ntask:\n  # name of the task type\n  name: bq2bq\n  \n  # configuration passed to the task before execution\n  config:\n    PROJECT: example\n    DATASET: data\n    TABLE: hello_table\n    LOAD_METHOD: APPEND\n    SQL_TYPE: STANDARD\n    PARTITION_FILTER: \'event_timestamp >= "{{.DSTART}}" AND event_timestamp < "{{.DEND}}"\'\n  \n  # time window, could be used by task for running incremental runs instead of processing\n  # complete past data at every iteration\n  window:\n    \n    # size of incremental window\n    # eg: 1h, 6h, 48h, 2h30m\n    size: 24h\n    \n    # shifting window forward of backward in time, by default it is yesterday\n    offset: "0"\n    \n    # truncate time window to nearest hour/day/week/month\n    # possible values: h/d/w/M\n    truncate_to: d\n    \n# labels gets passed to task/hooks\n# these can be used to attach metadata to running transformation\n# discovering usage, identifying cost, grouping identities, etc\nlabels:\n  orchestrator: optimus\n  \n# static dependencies that can be used to wait for upstream job to finish\n# before this job can be started for execution \ndependencies:\n\n  # list `job: <jobname>`\n  - job: sample_internal_job\n  \n# adhoc operations marked for execution at different hook points\n# accepts a list\nhooks:\n  - # name of the hook\n    name: transporter\n    \n    # where & when to attach this process\n    type: post\n    \n    # configuration passed to hook before execution\n    config:\n      KAFKA_TOPIC: optimus_example-data-hello_table\n      \n      # configuration being inherited from project level variables\n      PRODUCER_CONFIG_BOOTSTRAP_SERVERS: \'{{.GLOBAL__TransporterKafkaBroker}}\'\n      \n      PROTO_SCHEMA: example.data.HelloTable\n')),(0,i.kt)("h2",{id:"macros--templates"},"Macros & Templates"),(0,i.kt)("p",null,"Optimus allows using pre-defined macros/templates to make the pipelines more\ndynamic and extensible. Macros can be used in Job/Hooks configurations or Assets.\nSome macros are:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},'"{{.DEND}}"'),': this macro is replaced with the current execution date\n(in yyyy-mm-ddThh:mm:ssZ format) of the task (note that this is the execution date\nof when the task was supposed to run, not when it actually runs). It would\ntranslate to a timestamp in runtime. eg, "2021-01-30T00:00:00Z"'),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},'"{{.DSTART}}"'),": the value of this macro is DEND minus the task window. For\nthe DAILY task window, DSTART is one day behind DEND, if the task window is\nweekly, DSTART is 7 days before DEND."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},'"{{.EXECUTION_TIME}}"'),": the value of this marco is always the current timestamp.")),(0,i.kt)("p",null,"You can use these in either ",(0,i.kt)("inlineCode",{parentName:"p"},"job.yml")," configs or in assets. For example:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Asset for a SQL query ",(0,i.kt)("inlineCode",{parentName:"li"},"query.sql"))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},'select CONCAT("Hello, ", "{{.DEND}}") as message\n')),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Configuration in ",(0,i.kt)("inlineCode",{parentName:"li"},"job.yml"))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"version: 1\nname: example_job\n... omitting few configs ...\nhooks:\n- name: transporter\n  config:\n    BQ_TABLE: hello_table\n    FILTER_EXPRESSION: event_timestamp >= '{{.DSTART}}' AND event_timestamp < '{{.DEND}}'\n")),(0,i.kt)("p",null,"Macros can be chained together via pipe-sign with predefined functions."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Date"),": Converters Timestamp to Date. For example")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM table1\nWHERE DATE(event_timestamp) < '{{ .DSTART|Date }}'\n")),(0,i.kt)("h2",{id:"configuration"},"Configuration"),(0,i.kt)("p",null,"Each job specification has a set of configs made with a key value pair. Keys are always\nspecific to the execution unit and value could be of 3 types."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"User provided: These inputs are values provided by users at the time of creating\nvia optimus cli or modifying the job using a text editor. "),(0,i.kt)("li",{parentName:"ul"},"Task inherited: Hooks can inherit the configuration values from base transformation and\navoid providing the same thing using ",(0,i.kt)("inlineCode",{parentName:"li"},"{{.TASK__<CONFIG_NAME>}}")," macro.\nFor example:  ")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"task:\n  name: bq2bq\n  config:\n    DATASET: playground\nhooks:\n  name: myhook\n  config:\n    MY_DATASET: {{.TASK__DATASET}}\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Repository global: Configs that will be shared across multiple jobs and should remain static\ncan be configured in a global config store as part of tenant registration. These configs are\navailable to only the registered repository and will remain same for all the jobs. Jobs can access\nthem via ",(0,i.kt)("inlineCode",{parentName:"li"},"{{.GLOBAL__<CONFIG_NAME>}}"),".\nFor example:")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"task:\n  name: bq2bq\n  config:\n    DATASET: {{.GLOBAL__COMMON_DATASET}}    \nhooks:\n  name: myhook\n  config:\n    KAFKA_BROKER: {{.GLOBAL__KAFKA_BROKERS}}\n")),(0,i.kt)("p",null,"  At the moment we only support these configs to be registered via REST API exposed in optimus\nwhich will be discussed in a different section but in near future should be configurable via\na configuration file inside the repository."),(0,i.kt)("h2",{id:"assets"},"Assets"),(0,i.kt)("p",null,"There could be an asset folder along with the ",(0,i.kt)("inlineCode",{parentName:"p"},"job.yaml")," file generated via ",(0,i.kt)("inlineCode",{parentName:"p"},"optimus")," when\na new job is created. This is a shared folder across base transformation task\nand all associated hooks. For example, if BQ2BQ task is selected, it should generate a\ntemplate ",(0,i.kt)("inlineCode",{parentName:"p"},"query.sql")," file for writing the BigQuery transformation SQL. Assets can use\nmacros and functions powered by ",(0,i.kt)("a",{parentName:"p",href:"https://golang.org/pkg/text/template/"},"Go templating engine"),".\nOptimus also injects few helper functions provided in ",(0,i.kt)("a",{parentName:"p",href:"http://masterminds.github.io/sprig/"},"sprig"),"\nlibrary.\nFor example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},'{{ $name := "admin" }}\nselect CONCAT("Hello, ", "{{.name}}") as message\n')),(0,i.kt)("p",null,"Section of code can be imported from different asset files using\n",(0,i.kt)("a",{parentName:"p",href:"https://golang.org/pkg/text/template/#hdr-Actions"},"template"),". For example:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"File ",(0,i.kt)("inlineCode",{parentName:"li"},"partials.gtpl"))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"DECLARE t1 TIMESTAMP;\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Another file ",(0,i.kt)("inlineCode",{parentName:"li"},"query.sql"))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"{{template \"partials.gtpl\"}}\nSET t1 = '2021-02-10T10:00:00+00:00';\n")),(0,i.kt)("p",null,"During execution ",(0,i.kt)("inlineCode",{parentName:"p"},"query.sql")," will be rendered as:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"DECLARE t1 TIMESTAMP;\nSET t1 = '2021-02-10T10:00:00+00:00';\n")),(0,i.kt)("p",null,"whereas ",(0,i.kt)("inlineCode",{parentName:"p"},"partials.gtpl")," will be left as it is because file was saved with ",(0,i.kt)("inlineCode",{parentName:"p"},".gtpl"),"\nextension."),(0,i.kt)("p",null,"Similarly, a single file can contain multiple blocks of code that can function\nas macro of code replacement. For example:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"file.data")," ")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'  Name: {{ template "name"}}, Gender: {{ template "gender" }}\n')),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"partials.gtpl"))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'  {{- define "name" -}} Adam {{- end}}\n  {{- define "gender" -}} Male {{- end}}\n')),(0,i.kt)("p",null,"This will render ",(0,i.kt)("inlineCode",{parentName:"p"},"file.data")," as"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Name: Adam, Gender: Male\n")),(0,i.kt)("h2",{id:"scheduler"},"Scheduler"),(0,i.kt)("p",null,"A scheduler is one of the core unit responsible for scheduling the jobs for execution\non a defined interval. By default, Optimus uses ",(0,i.kt)("a",{parentName:"p",href:"https://airflow.apache.org/"},"Airflow"),"\nas the schedule but does support extending to different schedulers that follow\nfew guidelines.\nTODO: Docs for supporting custom scheduler"),(0,i.kt)("h2",{id:"dependency-resolver"},"Dependency Resolver"),(0,i.kt)("p",null,"A job can have a source, and a destination to start with. This source could be internal\nto optimus like another job or external like a S3 bucket. If the dependency is internal\nto optimus, it is obvious that in an ETL pipeline, it is required for the dependency to\nfinish successfully first before the dependent job can start. This direct or indirect\ndependency can be automatically inferred in job specifications based on task inputs.\nFor example, in BQ2BQ task, it parses the SQL transformation and look for tables that\nare used as source using FROM, JOIN, etc keywords and mark them as the dependency for the\ncurrent job. Optimus call this automatic dependency resolution which happens automatically.\nThere are options to manually specify a dependency using the job name within the same\nproject if needed to.\nOverall dependencies can be divided into three types"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Intra: Jobs depending on other jobs within same tenant repository"),(0,i.kt)("li",{parentName:"ul"},"Inter: Jobs depending on other jobs over other tenant repository"),(0,i.kt)("li",{parentName:"ul"},"Extra: Jobs depending on an external dependency outside Optimus ","[TODO]")),(0,i.kt)("h2",{id:"priority-resolver"},"Priority Resolver"),(0,i.kt)("p",null,'Schedulers who support "Priorities" to handle the problem of "What to execute first"\ncan take the advantage of Optimus Priority Resolver. To understand this lets take an\nexample taking Airflow as the scheduler:'),(0,i.kt)("p",null,"Let's say we provide limited slots to airflow i.e. 10, that means only 10 tasks can be\nexecuted at a time. Now these tasks could be a ",(0,i.kt)("a",{parentName:"p",href:"https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/sensors/index.html"},"Sensor"),"\nto check if the upstream ",(0,i.kt)("a",{parentName:"p",href:"https://airflow.apache.org/docs/apache-airflow/stable/dag-run.html"},"DAG"),"\nis finished, or it could be a task that actually executes the transformation.\nThe issue is when Airflow don\u2019t know what to prioritise when if all of them are scheduled\nto execute at the same time. If airflow keep on scheduling these sensors(which will\nnever pass because upstream DAG never really got the chance to execute as airflow didn\u2019t schedule\nthe transformation task) it will get stuck in kind of a deadlock. All those 10 slots\nwill be filled by sensors again and again and Airflow will take enormous time to schedule\na actual transformation. Its not really a deadlock but very similar and waste a lot of time\nfinding the correct task to execute like a needle in haystack. So recently we have\ntaken a story to prioritise these tasks based on how many downstream dependencies are waiting\nfor it. That is, in a dependency tree, whatever is at the root(depends on nothing) will always\nbe prioritised first like Standardised layer dags and then it will move to downstream\nsensors and tasks."),(0,i.kt)("p",null,"This will help fully utilize the Scheduler capabilities."),(0,i.kt)("h2",{id:"optimus-plugins"},"Optimus Plugins"),(0,i.kt)("p",null,"Optimus's responsibilities are currently divided in two parts, scheduling a transformation ",(0,i.kt)("a",{parentName:"p",href:"#Job"},"task")," and running one time action to create or modify a ",(0,i.kt)("a",{parentName:"p",href:"#Datastore"},"datastore")," resource. Defining how a datastore is managed can be easy and doesn't leave many options for configuration or ambiguity although the way datastores are implemented gives developers flexibility to contribute additional type of datastore, but it is not something we do every day."),(0,i.kt)("p",null,"Whereas tasks used in jobs that define how the transformation will execute, what configuration does it need as input from user, how does this task resolves dependencies between each other, what kind of assets it might need. These questions are very open and answers to them could be different in  different organisation and users. To allow flexibility of answering these questions by developers themselves, we have chosen to make it easy to  contribute a new kind of task or even a hook. This modularity in Optimus is achieved using plugins."),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Plugins are self-contained binaries which implements predefined protobuf interfaces to extend Optimus functionalities.")),(0,i.kt)("p",null,"Optimus can be divided in two logical parts when we are thinking of a pluggable model, one is the ",(0,i.kt)("strong",{parentName:"p"},"core")," where everything happens which is common for all job/datastore, and the other part which could be variable and needs user specific definitions of how things should work which is a ",(0,i.kt)("strong",{parentName:"p"},"plugin"),"."),(0,i.kt)("h2",{id:"datastore"},"Datastore"),(0,i.kt)("p",null,"Optimus datastores are managed warehouses that provides CRUD on resources attached to it. Each warehouse supports fixed set of resource types, each type has its own specification schema."),(0,i.kt)("p",null,"At the moment, Optimus supports BigQuery datastore for 3 types of resources:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://cloud.google.com/bigquery/docs/datasets-intro"},"Dataset")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://cloud.google.com/bigquery/docs/tables-intro"},"Table")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://cloud.google.com/bigquery/docs/views-intro"},"Standard View"))),(0,i.kt)("h2",{id:"secret-management"},"Secret Management"),(0,i.kt)("p",null,"TODO"),(0,i.kt)("h2",{id:"replay--backups"},"Replay & Backups"),(0,i.kt)("p",null,"TODO"),(0,i.kt)("h2",{id:"monitoring--alerting"},"Monitoring & Alerting"),(0,i.kt)("p",null,"TODO"))}d.isMDXComponent=!0}}]);