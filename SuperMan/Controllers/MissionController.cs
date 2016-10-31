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

        // person who request help
        public ActionResult AcceptHelp(double id)
        {
            ViewBag.MissionId = id;
            return View();
        }

        // person who give help
        public ActionResult GiveHelp()
        {
            return View();
        }
    }
}
