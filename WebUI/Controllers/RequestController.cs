using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
 
namespace Inv.WebUI.Controllers
{
    public class RequestController : Controller
    {
        // GET: Request
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LoginIndex()
        {
            //SessionRecord ses = new SessionRecord();
            //ses.CurrentYear = WebConfigurationManager.AppSettings["DefaultYear"];
            //ses.Language = WebConfigurationManager.AppSettings["Defaultlanguage"];
            //SessionManager.SessionRecord = ses;

            return View();
        }

        public ActionResult RequestIndex()
        {
            return View(/*"~/Views/Login/updates.cshtml"*/);
        }


        public JsonResult OnLogged()
        {

            var obj = new
            {
                url = Url.Action("HomeIndex", "Home")

            };
            var result = Shared.JsonObject(obj);
            return result;
        }

    }
}