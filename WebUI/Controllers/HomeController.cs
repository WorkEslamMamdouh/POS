using WebUI.Filter;
using WebUI.Models;
using Inv.WebUI.Tools;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace WebUI.Controllers
{

    [AuthorizeUserAttribute()]
    public class HomeController : Controller
    {



        //    GET: Home
        public ActionResult HomeIndex()
        {

            //Session["ErrorUrl"] = "";//Url.Action("LoginIndex", "Login");
            //SessionManager.SessionRecord.CompanyNameAr = "";

            //Session["SystemProperties"] = SessionManager.SessionRecord;

            return View("HomeIndex");
        }

        public ActionResult AdminIndex()
        {


            return View();
        }
        public ActionResult HomeIndexPackage()
        {


            return View("HomeIndex");
        }

        //public JsonResult GetSystemProperties()
        //{
        //    SessionRecord jsonObject = (SessionRecord)Session["SystemProperties"];
        //    string data = Newtonsoft.Json.JsonConvert.SerializeObject(jsonObject, Newtonsoft.Json.Formatting.Indented);
        //    return Shared.JsonObject(data);
        //}

        public ActionResult Logout()
        {

            //SessionManager.Me = null;
            //SessionManager.ModelCount = 0;
            //SessionManager.PageIndex = 0;
            //SessionManager.SessionRecord = null;

            return RedirectToAction("Loginindex", "Login");
        }

        public ViewResult Help()
        {

            return View();
        }


        public ActionResult OpenView(String ModuleCode)
        {


            if (ModuleCode == "ImagPopUp")
            {
                return PartialView("~/Views/Shared/ImagePopup.cshtml");

            }
            if (ModuleCode == "Messages_screen")
            {
                return PartialView("~/Views/Shared/Messages_screen.cshtml");
            }
            if (ModuleCode == "ImagePopupiupload")
            {
                return PartialView("~/Views/Shared/ImagePopupiupload.cshtml");
            }

            return PartialView("");

        }

        #region Open Pages 

        public ActionResult SlsTrSalesIndex()
        {
            return View("~/Views/Sales/SlsTrSalesIndex.cshtml");
        }
        public ActionResult SlsTrReturnIndex()
        {
            return View("~/Views/Sales/SlsTrReturnIndex.cshtml");
        }
        public ActionResult PurchasesIndex()
        {
            return View("~/Views/Purchases/PurchasesIndex.cshtml");
        }

        public ActionResult CategoriesIndex()
        {
            return View("~/Views/Stock/CategoriesIndex.cshtml");
        }


        public ActionResult ItemsIndex()
        {
            return View("~/Views/Stock/ItemsIndex.cshtml");
        }
        public ActionResult familly_CatIndex()
        { 

            return View("~/Views/Stock/familly_Cat.cshtml");
        }
         public ActionResult SupplierIndex()
        {
            return View("~/Views/Generalsetting/SupplierIndex.cshtml");
        }
          public ActionResult SalesinventoryIndex()
        { 

            return View("~/Views/Report/Salesinventory.cshtml");
        }
          public ActionResult Income_expensesIndex()
        { 

            return View("~/Views/Report/Income_expenses.cshtml");
        }

        public ActionResult USERSIndex()
        {

            return View("~/Views/Generalsetting/USERSIndex.cshtml");
        }
        

        #endregion  Open Pages 

    }
}