using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using TheBannerMaker.Operations;
using WebBackgrounder;

namespace TheBannerMaker.ScheduleJobs
{
    public class JsonJob : Job
    {
        public string currentMatchId;

        public JsonJob(TimeSpan interval, TimeSpan timeout)
: base("Sample Job", interval, timeout)
        {
        }

        public override Task Execute()
        {
           
            return new Task(() =>
            {

                var path = ConfigurationManager.AppSettings["MappedPath"] + "Json\\testBG.json";
                var pathUK = ConfigurationManager.AppSettings["MappedPath"] + "Json\\testUK.json";

                Operations.JsonOperations.UploadFileToFTPServer(path);
                Operations.JsonOperations.UploadFileToFTPServer(pathUK);
                //Operations.JsonOperations.UploadFileToFTPServer(pathTR);
                //Operations.JsonOperations.UploadFileToFTPServer(pathSQ);
                UpdateOperations.DeleteOldMatches();
                JsonOperations.WriteDataToJsonFile();
               

                Thread.Sleep(int.Parse(ConfigurationManager.AppSettings["XmlRefreshInterval"]));
            });
        }


    }
}