using WebUI.Models;
 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using CloudBeuty.WebUI.Tools;

namespace WebUI.Controllers
{
    public class LoginController : Controller
    {


        public ActionResult LoginIndex()
        {
            SessionRecord ses = new SessionRecord();
            ses.CurrentYear = WebConfigurationManager.AppSettings["DefaultYear"];
            ses.ScreenLanguage = WebConfigurationManager.AppSettings["Defaultlanguage"];
            SessionManager.SessionRecord = ses;

            return View();
        }

        public ActionResult updatesIndex()
        {
            return View(/*"~/Views/Login/updates.cshtml"*/);
        }
       
        public  ActionResult UnderConstruction()


        {
            return View();
        }
        public ActionResult WebSectionIndex()
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