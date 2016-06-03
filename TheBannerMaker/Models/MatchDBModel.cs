using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TheBannerMaker.Models
{
    public class MatchDBModel
    {
        public int Id { get; set; }
        public string Sport { get; set; }
        public string MatchName { get; set; }
        public string MatchId { get; set; }
        public string MatchInplayId { get; set; }
        public string Market { get; set; }
        public string Language { get; set; }
        public bool IsInplayNow { get; set; }
        public bool IsInplay { get; set; }
        public bool IsSpecial { get; set; }
        public DateTime MatchDisplayDate { get; set; }
        
    }
}