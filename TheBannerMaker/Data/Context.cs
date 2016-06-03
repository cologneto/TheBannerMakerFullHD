using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using TheBannerMaker.Models;

namespace TheBannerMaker.Data
{
    public class Context : DbContext
    {
        public DbSet<MatchDBModel> MatchesDatabase { get; set; }
    }
}