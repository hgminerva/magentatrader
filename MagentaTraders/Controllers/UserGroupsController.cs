using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MagentaTraders.Controllers
{
    public class UserGroupsController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "User Groups";

            return View();
        }
    }
}
