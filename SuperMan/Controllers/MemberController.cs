using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SuperMan.Controllers
{
    public class MemberController : Controller
    {
        //
        // GET: /Member/

        public ActionResult Profile()
        {
            return View();
        }

    }
}
