using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using TheBannerMaker.App_Start;

namespace TheBannerMaker
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            var path = HttpContext.Current.Server.MapPath("~");
            ConfigurationManager.AppSettings["MappedPath"] = path;
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            WebBackgrounderSetup.Start();
        }
    }
}
