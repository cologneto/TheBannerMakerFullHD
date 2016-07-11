using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace TheBannerMaker.Models
{
    public class Sport
    {
        public string SportId { get; set; }
        public string SportName { get; set; }

        public static IQueryable<Sport> GetSports()
        {

            XDocument xml = XDocument.Load(@"https://www.efbet.com/cache/sportTypeList/BG.xml");

            List<Sport> list = xml.Descendants("sporttype").Select(x => new Sport
            {
                SportId = (string)x.Element("idfosporttype").Value,
                SportName = (string)x.Element("name").Value

            }).ToList<Sport>();

            return list.AsQueryable();

        }
    }
}