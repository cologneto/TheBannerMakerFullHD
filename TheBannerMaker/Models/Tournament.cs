using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace TheBannerMaker.Models
{
    public class Tournament
    {
        public string TournamentId { get; set; }
        public string TournamentName { get; set; }

        public static IQueryable<Tournament> GetTournaments(string sport)
        {
            if (sport == null)
            {
                sport = "FOOTBALL";
            }

            XDocument xml = XDocument.Load(@"https://www.efbet.com/cache/sportList/BG/" + sport + ".xml");

            List<Tournament> list = xml.Descendants("sport").Select(x => new Tournament
            {
                TournamentId = (string)x.Element("idfosport").Value,
                TournamentName = (string)x.Element("name").Value

            }).ToList<Tournament>();

            return list.AsQueryable();
            
        }
    }
}