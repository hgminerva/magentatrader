using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MagentaTraders.Controllers
{
    public class StockChartController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Chart";

            return View();
        }
    }
}