using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TheBannerMaker.Models;
using System.Xml.Linq;
using System.IO;
using System.Configuration;
using TheBannerMaker.Data;

namespace TheBannerMaker.Operations
{
    public class UpdateOperations
    {
        private static string currentMatch = "";
        private static XDocument currentXMLDocument;

        public static List<Selection> GetSelections(MatchDBModel model, string bannerLanguage)
        {

            string xmlPath = @"https://www.efbet.com/cache/marketsByEvent/" + bannerLanguage + "/"
                                                + model.MatchId + ".xml";



            XDocument xml = new XDocument();


            if (currentMatch != model.MatchId)
            {

                try
                {
                    xml = XDocument.Load(xmlPath);
                }
                catch (Exception ex)
                {
                    try
                    {
                        using (StreamWriter sw = new StreamWriter(ConfigurationManager.AppSettings["MappedPath"] + "Logs\\Logs.txt", true))
                        {
                            sw.WriteLine(ex.Message + " - " + DateTime.Now);
                            GetSelections(model, bannerLanguage);
                        }
                    }
                    catch (Exception)
                    {

                        Console.WriteLine();
                    }


                }

                currentMatch = model.MatchId;

                currentXMLDocument = xml;

            }

            var selectionList = currentXMLDocument.Descendants("market")
                .Where(x => x.Element("name")
                .Value == model.Market)
                .Descendants("selection").Select(x => new Selection
                {
                    SelectionName = x.Element("name").Value,
                    SelectionValue = (double.Parse(x.Element("currentpriceup").Value, 0.00) / double.Parse(x.Element("currentpricedown").Value, 0.00)) + 1

                }).ToList<Selection>();

            return selectionList;





            //var xml = XDocument.Load(xmlPath);


            //var selectionList = xml.Descendants("market")
            //    .Where(x => x.Element("name").Value == model.Market)
            //    .Descendants("selection").Select(x => new Selection
            //    {
            //        SelectionName = x.Element("name").Value,
            //        SelectionValue = (double.Parse(x.Element("currentpriceup").Value, 0.00) / double.Parse(x.Element("currentpricedown").Value, 0.00)) + 1

            //    }).ToList<Selection>();

            //return selectionList;

        }

        public static void DeleteOldMatches() {
            var nowLive = DateTime.Now.AddHours(-4);
            var now = DateTime.Now;
            var db = new Context();
            
            var matchesForDelete = db.MatchesDatabase.Where(om => (om.IsInplayNow == true) && (om.MatchDisplayDate < nowLive));

            if (matchesForDelete.Count() != 0)
            {
                db.MatchesDatabase.RemoveRange(matchesForDelete);
                db.SaveChanges();
            }
            //else
            //{
            //    matchesForDelete = db.MatchesDatabase.Where(om => (om.MatchDisplayDate < nowLive));
            //    db.MatchesDatabase.RemoveRange(matchesForDelete);
            //    db.SaveChanges();
            //}

        }
        
    }
}