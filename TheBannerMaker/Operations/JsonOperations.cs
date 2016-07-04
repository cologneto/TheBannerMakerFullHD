using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using TheBannerMaker.Data;
using TheBannerMaker.Models;

namespace TheBannerMaker.Operations
{

    public class JsonOperations
    {
        public static List<MatchVisualModel> GetDailyMatches(string bannerLanguage)
        {
            var date = DateTime.Now.Date;
            var lastDate = DateTime.Now.Date.AddDays(1).AddHours(6);
            var maxDate = DateTime.Now.AddMinutes(20);
            //.AddDays(1).Date
            //Change matches Id from prematch to in play

            var ctx = new Context();
            var changeIdCollection = ctx.MatchesDatabase.Where(dm => (dm.MatchDisplayDate < maxDate) && (dm.MatchInplayId != "0")).OrderBy(m => m.MatchId).ToList();
            string currId = "";
            //ctx.MatchesDatabase.RemoveRange();
            //ctx.MatchesDatabase.AddRange(changeIdCollection);
            
            if (changeIdCollection.Count() > 0)
            {
                foreach (var item in new List<MatchDBModel>(changeIdCollection) )
                {
                    if (currId != item.MatchId)
                    {
                        item.MatchId = item.MatchInplayId;
                        item.IsInplayNow = true;
                        
                        
                    }
                    else
                    {
                        changeIdCollection.Remove(item);
                        ctx.MatchesDatabase.Remove(item);
                       
                    }
                    currId = item.MatchId;
                    ctx.SaveChanges();
                }
            }
            //.AddRange
            //var matches = ctx.MatchesDatabase.Where(m => m.IsInplayNow == true && m.Language == bannerLanguage).ToList();
            var matches=ctx.MatchesDatabase.Where(m => m.IsSpecial == true && m.MatchDisplayDate > maxDate && m.Language == bannerLanguage).OrderBy(x => x.Id).ToList();
            var matchesPrematch = ctx.MatchesDatabase
                                           .Where(dm => dm.MatchDisplayDate >= date && dm.Language == bannerLanguage && dm.IsSpecial != true)
                                           .OrderBy(x => x.Id)
                                           .Where(dm => dm.MatchDisplayDate > maxDate)
                                           .Where(dm => dm.MatchDisplayDate < lastDate);

            matches.AddRange(matchesPrematch);

            //var list = list
            //    .GroupBy(i => i.MetricText)
            //    .Select(g => g.First())
            //    .ToList();

            var counter = matches.Count();
            if (counter == 0)
            {
                date = date.AddDays(1);

                lastDate = lastDate.AddDays(1);
                matchesPrematch = ctx.MatchesDatabase
                                            .Where(dm => dm.MatchDisplayDate >= date && dm.Language == bannerLanguage && dm.IsSpecial != true)
                                            .OrderBy(x => x.Id)
                                            .Where(dm => dm.MatchDisplayDate > maxDate)
                                            .Where(dm => dm.MatchDisplayDate < lastDate);
                matches.AddRange(matchesPrematch);
            }

            var matchesWithSelections = new List<MatchVisualModel>();

            foreach (var match in matches)
            {
                if ((match.MatchId != null) && (UpdateOperations.GetSelections(match, match.Language).Count != 0))
                {
                    matchesWithSelections.Add(new MatchVisualModel
                    {
                        Sport = match.Sport,
                        MatchName = match.MatchName,
                        Market = match.Market,
                        Selections = UpdateOperations.GetSelections(match, match.Language),
                        MatchInplayId = match.MatchInplayId,
                        MatchId = match.MatchId,
                        MatchTime = match.MatchDisplayDate.ToString(),
                        Language = match.Language,
                        IsInplayNow = match.IsInplayNow,
                        IsInplay = match.IsInplay,
                        IsSpecial = match.IsSpecial
                    });
                }

            }
            return matchesWithSelections;
        }

        public static void WriteDataToJsonFile()
        {
            var bannerLanguagesList = new List<string> { "BG", "UK", "TR", "SQ" };

            foreach (var item in bannerLanguagesList)
            {
                var list = GetDailyMatches(item);
                string json = JsonConvert.SerializeObject(list, Formatting.Indented);
                System.IO.File.WriteAllText(ConfigurationManager.AppSettings["MappedPath"] + "\\Json\\test" + item + ".json", json);
            }

        }


        public static void UploadFileToFTPServer(string filename)
        {
            string ftpServerIP = "195.64.160.20";
            string ftpUserName = "banner";
            string ftpPassword = "BANupload!";

            FileInfo objFile = new FileInfo(filename);
            FtpWebRequest objFTPRequest;

            // Create FtpWebRequest object
            objFTPRequest = (FtpWebRequest)FtpWebRequest.Create(new Uri("ftp://" + ftpServerIP + "/CupBanners/Json/" + objFile.Name));

            // Set Credintials
            objFTPRequest.Credentials = new NetworkCredential(ftpUserName, ftpPassword);

            // By default KeepAlive is true, where the control connection is
            // not closed after a command is executed.
            objFTPRequest.KeepAlive = false;

            // Set the data transfer type.
            objFTPRequest.UseBinary = true;

            // Set content length
            objFTPRequest.ContentLength = objFile.Length;

            // Set request method
            objFTPRequest.Method = WebRequestMethods.Ftp.UploadFile;

            // Set buffer size
            int intBufferLength = 16 * 1024;
            byte[] objBuffer = new byte[intBufferLength];

            // Opens a file to read
            FileStream objFileStream = objFile.OpenRead();

            try
            {
                // Get Stream of the file
                Stream objStream = objFTPRequest.GetRequestStream();

                int len = 0;

                while ((len = objFileStream.Read(objBuffer, 0, intBufferLength)) != 0)
                {
                    // Write file Content
                    objStream.Write(objBuffer, 0, len);
                }

                objStream.Close();
                objFileStream.Close();
                Console.Write("File upload success...");
            }
            catch (Exception ex)
            {
                using (StreamWriter sw = new StreamWriter(ConfigurationManager.AppSettings["MappedPath"] + "Logs\\LogsFTP.txt", true))
                {
                    sw.WriteLine(ex.Message + " - " + DateTime.Now);
                }

            }
        }
    }
}