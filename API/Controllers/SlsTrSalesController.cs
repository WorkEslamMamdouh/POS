using API.Models;
using BLL.Services.SlsTrSales;
using DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Controllers;
using WebUl.API.Tools;
using System.Web.Http.Cors;
using System.Data.SqlClient;
using System.Data.Entity;
using WebUl.DAL.Repository;
using Newtonsoft.Json;
using API.Models.CustomModel;

namespace API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class SlsTrSalesController : BaseController
    {


        private readonly ISlsTrSalesServices SlsTrSalesServices;

        public SlsTrSalesController(ISlsTrSalesServices _SlsTrSalesServices)
        {
            this.SlsTrSalesServices = _SlsTrSalesServices;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string UserName, string password)
        {
            if (ModelState.IsValid)
            {
                var Login = SlsTrSalesServices.GetAll().ToList();

                return Ok(new BaseResponse(Login));

            }
            return BadRequest(ModelState);
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertInvoiceMasterDetail([FromBody]SlsInvoiceMasterDetails obj)
        {
            if (ModelState.IsValid)
            {
                try
                { 
                    string UserName = obj.I_Sls_TR_Invoice.UserName;
                    int Namber_Order_Delivery = obj.I_Sls_TR_Invoice.Namber_Order_Delivery;
                    decimal Total_All = obj.I_Sls_TR_Invoice.Total_All;
                    string Date_Order_Delivery = obj.I_Sls_TR_Invoice.Date_Order_Delivery;
                    int Tax = obj.I_Sls_TR_Invoice.Tax;
                    int CUSTOMER_ID = obj.I_Sls_TR_Invoice.CUSTOMER_ID;
                    string type_order = obj.I_Sls_TR_Invoice.type_order;
                    int Confirmation = obj.I_Sls_TR_Invoice.Confirmation == true? 1 : 0;
                    string qury = "insert_ORDER_DELIVERY  '" + UserName + "'," + Namber_Order_Delivery + "," + Total_All + ",'" + Date_Order_Delivery + "'," + Tax + "," + CUSTOMER_ID + ",'" + type_order + "'," + Confirmation + "";

                    var Num_Order = db.Database.SqlQuery<int>(qury).FirstOrDefault();

                    for (int i = 0; i < obj.I_Sls_TR_InvoiceItems.Count; i++)
                    {
                        obj.I_Sls_TR_InvoiceItems[i].FK_ORDER_Delivery = Num_Order;

                        int PRODUCT_ID =Convert.ToInt16(obj.I_Sls_TR_InvoiceItems[i].PRODUCT_ID);
                        int Quantity =Convert.ToInt16(obj.I_Sls_TR_InvoiceItems[i].Quantity_sell);

                        string update = "update PRODUCT set PRODUCT_QET=(PRODUCT_QET - "+ Quantity + ") where PRODUCT_ID='" + PRODUCT_ID + "'";

                        var InvoiceItems = SlsTrSalesServices.Insert(obj.I_Sls_TR_InvoiceItems[i]);

                        var update_Qy = db.Database.ExecuteSqlCommand(update);

                    }


                    return Ok(new BaseResponse(Num_Order));
                    ////////
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }

            }
            return BadRequest(ModelState);
        }

       

    }
}
