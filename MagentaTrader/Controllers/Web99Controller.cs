using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MagentaTrader.Controllers
{
    public class Web99Controller : Controller
    {
        //
        // GET: /Web99/
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }
	}
}