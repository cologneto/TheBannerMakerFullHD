using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace TheBannerMaker.Models
{
    public class Market
    {
        public string MarketName { get; set; }
        public string MatchStart { get; set; }


        public static IQueryable<Market> GetMarkets(string matchId, string language)
        {
            XDocument xml = XDocument.Load(@"https://www.efbet.com/cache/marketsByEvent/" + language + "/" + matchId + ".xml");

            List<Market> list = xml.Descendants("market").Select(x => new Market
            {
                MarketName = (string)x.Element("name").Value,
                MatchStart = (string)x.Element("tsstart").Value
            }).ToList<Market>();

            return list.AsQueryable();

        }
    }
}