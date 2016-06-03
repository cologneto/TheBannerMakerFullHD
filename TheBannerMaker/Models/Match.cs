using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace TheBannerMaker.Models
{
    public class Match
    {
        public string MatchName { get; set; }
        public string MatchID { get; set; }
        public string MatchIDInPlay { get; set; }
        public string MatchStartTime { get; set; }

        public static IQueryable<Match> GetMatches(string tournament, string language)
        {
            XDocument xml = XDocument.Load(@"https://www.efbet.com/cache/sport/" + language + "/" + tournament + ".xml");

            List<Match> list = xml.Descendants("event").Select(x => new Match
            {
                MatchName = (string)x.Element("name").Value,
                MatchID = (string)x.Element("idfoevent").Value,
                MatchIDInPlay = (string)x.Element("inplayeventmapping").Value,
                MatchStartTime = (string)x.Element("tsstart").Value
            }).ToList<Match>();

            return list.AsQueryable();
        }
    }
}