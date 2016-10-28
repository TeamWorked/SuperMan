using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SuperMan.Controllers
{
    public class MissionController : Controller
    {
        //
        // GET: /Mission/

        public ActionResult CreateMission()
        {
            return View();
        }

        public ActionResult SearchMission()
        {
            return View();
        }

        public ActionResult Help()
        {
            return View();
        }
    }
}
