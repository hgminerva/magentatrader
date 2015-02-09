using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace MagentaTrader
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //// Web API configuration and services

            //// Web API routes
            //config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{symbol}/{datestart}/{dateend}",
                defaults: new { Key = RouteParameter.Optional, symbol = RouteParameter.Optional, datestart = RouteParameter.Optional, dateend = RouteParameter.Optional, Action = "Get" }
            );

        }
    }
}
