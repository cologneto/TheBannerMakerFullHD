using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TheBannerMaker.Operations
{
    public class AllowCrossOrigin : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            filterContext.RequestContext.HttpContext.Response.AddHeader("Access - Control - Allow - Origin", " * ");
            base.OnActionExecuting(filterContext);
        }
    }
}