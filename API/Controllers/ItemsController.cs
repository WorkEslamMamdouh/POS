using API.Models;
using BLL.Services.Item;
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

namespace API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class ItemsController : BaseController
    {

        private readonly IItemServices ItemServices;

        public ItemsController(IItemServices _IItemServices)
        {
            ItemServices = _IItemServices;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(int CompCode)
        {
            if (ModelState.IsValid)
            {
                var Items = ItemServices.GetAll().ToList();

                return Ok(new BaseResponse(Items));

            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_Item_by_Cat(int Cat)
        {
            if (ModelState.IsValid)
            {
                var Item = ItemServices.GetAll(x => x.ID_CAT == Cat).ToList();

                return Ok(new BaseResponse(Item));

            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Getbyserial(string Serial)
        {
            if (ModelState.IsValid)
            {
                var Item = ItemServices.GetAll(x => x.serial == Serial).ToList();
                //var Item = db.Database.ExecuteSqlCommand("select PRODUCT_NAME , PRODUCT_QET from PRODUCT where serial =" +Serial+"");

                return Ok(new BaseResponse(Item));

            }
            return BadRequest(ModelState);
        }



        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateQTy([FromBody]PRODUCT PRODUCTAll)
        {
            if (ModelState.IsValid)
            {
                //var Item = db.Database.ExecuteSqlCommand("UPDATE PRODUCT SET PRODUCT_QET ="+Qty+" where serial = "+Serial+"");
                 
                var updated = ItemServices.Update(PRODUCTAll); 
                return Ok(new BaseResponse(100));

            }
            return BadRequest(ModelState);
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult open_and_close_Login(string UserName, string password, int Open_Login)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var companies = db.Database.SqlQuery<GetUser_Login_Result>("GetUser_Login  N'" + UserName + "',N'" + password + "'," + Open_Login + " ").ToList();
                    //var companies = db.GFun_Companies(userCode).ToList();

                    return Ok(new BaseResponse(companies));


                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult PROC_Delete_Rows(int ID, string TR_Type)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var companies = db.Database.SqlQuery<Delete_Rows_Result>("Delete_Rows " + ID + ",'" + TR_Type + "'").ToList();

                    return Ok(new BaseResponse(companies));


                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult PROC_Enter_Customer(int ID, string TR_Type)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var companies = db.Database.SqlQuery<Enter_Customer_Result>("Enter_Customer " + ID + ",'" + TR_Type + "'").ToList();

                    return Ok(new BaseResponse(companies));


                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }

       
        public string ExecuteScalar(string SqlStatement)
        {
            string connectionString = db.Database.Connection.ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = SqlStatement;
                    connection.Open();

                    string result = string.Empty;

                    result = command.ExecuteScalar().ToString();
                    connection.Close();
                    command.Dispose();
                    connection.Dispose();


                    return result;
                }
            }

        }




        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]PRODUCT Nation)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var Nationality = ItemServices.Insert(Nation);
                    return Ok(new BaseResponse(Nationality));
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int ID)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ItemServices.Delete(ID);
                    return Ok(new BaseResponse());
                }
                catch (Exception  )
                {
                    return Ok(new BaseResponse(0, "Error"));
                }

            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody]PRODUCT Nation)
        {
            if (ModelState.IsValid)
            { 
                try
                {
                    var Nationality = ItemServices.Update(Nation);
                    return Ok(new BaseResponse(Nationality));
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }



        //***************asmaa********************//
        [HttpGet, AllowAnonymous]
        public IHttpActionResult UpdateLst(List<PRODUCT> PRODUCT)
        {

            try
            {
                var InsertOperationItems = PRODUCT.Where(x => x.StatusFlag == "i").ToList();
                var updatedOperationItems = PRODUCT.Where(x => x.StatusFlag == "u").ToList();
                var deletedOperationItems = PRODUCT.Where(x => x.StatusFlag == "d").ToList();


                //loop Insert  I_Pur_TR_ReceiveItems
                foreach (var item in InsertOperationItems)
                {


                    var Insert = ItemServices.Insert(item);

                }

                //loop Update  I_Pur_TR_ReceiveItems
                foreach (var item in updatedOperationItems)
                {

                    var updated = ItemServices.Update(item);

                }

                //loop Delete  I_Pur_TR_ReceiveItems
                foreach (var item in deletedOperationItems)
                {
                    int id = item.PRODUCT_ID;
                    ItemServices.Delete(id);

                }


                return Ok(new BaseResponse("ok"));
            }
            catch (Exception  )
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "الصنف مستخدم بافعل لا يمكنك تغيره"));
            }

        }


        [HttpPost, AllowAnonymous]
        public IHttpActionResult Updat(List<PRODUCT> PRODUCTAll)
        {

            try
            {
                var InsertOperationItems = PRODUCTAll.Where(x => x.StatusFlag == "i").ToList();
                var updatedOperationItems = PRODUCTAll.Where(x => x.StatusFlag == "u").ToList();
                var deletedOperationItems = PRODUCTAll.Where(x => x.StatusFlag == "d").ToList();


                //loop Insert  I_Pur_TR_ReceiveItems
                foreach (var item in InsertOperationItems)
                {


                    var Insert = ItemServices.Insert(item);

                }

                //loop Update  I_Pur_TR_ReceiveItems
                foreach (var item in updatedOperationItems)
                {

                    var updated = ItemServices.Update(item);

                }

                //loop Delete  I_Pur_TR_ReceiveItems
                foreach (var item in deletedOperationItems)
                {
                    int id = item.PRODUCT_ID;
                    ItemServices.Delete(id);

                }


                return Ok(new BaseResponse("ok"));
            }
            catch (Exception)
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "الصنف مستخدم بافعل لا يمكنك تغيره"));
            }

        }

    }
}
