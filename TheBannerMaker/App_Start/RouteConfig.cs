using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace TheBannerMaker
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               "GetTournaments",
               "Home/GetTournaments/{sportId}",
               new { controller = "Home", action = "GetTournaments", sportId = "" }
           );

            routes.MapRoute(
                "GetMatches",
                "Home/GetMatches/{TournamentId}",
                new { controller = "Home", action = "GetMatches", sportId = "" }
            );
            routes.MapRoute(
                "MarketList",
                "Home/GetMarkets/{MatchId}",
                new { controller = "Home", action = "GetMarkets", sportId = "" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
