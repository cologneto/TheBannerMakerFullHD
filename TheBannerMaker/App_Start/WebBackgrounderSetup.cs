using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TheBannerMaker.ScheduleJobs;
using WebBackgrounder;

namespace TheBannerMaker.App_Start
{
    public static class WebBackgrounderSetup
    {
        static readonly JobManager _jobManager = CreateJobWorkersManager();

        public static void Start()
        {
            _jobManager.Start();
        }

        public static void Shutdown()
        {
            _jobManager.Dispose();
        }

        private static JobManager CreateJobWorkersManager()
        {
            var jobs = new IJob[]
            {
                new JsonJob(TimeSpan.FromSeconds(60), TimeSpan.FromSeconds(120)),
                /* new ExceptionJob(TimeSpan.FromSeconds(15)), */
               // new WorkItemCleanupJob(TimeSpan.FromMinutes(1), TimeSpan.FromMinutes(5), new WorkItemsContext())
            };

            //var coordinator = new WebFarmJobCoordinator();
            var manager = new JobManager(jobs, new JobHost());
            // manager.Fail(ex => Elmah.ErrorLog.GetDefault(null).Log(new Error(ex)));
            return manager;
        }
    }
}