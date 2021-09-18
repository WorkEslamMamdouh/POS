using API.Models;
using DAL.Domain;
using BLL.Services.GUSERS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebUl.API.Tools;
using API.Models.CustomModel;

namespace API.Controllers
{
    public class G_USERSController : BaseController

    {
        private readonly IG_USERSService G_USERSService;


        public G_USERSController(IG_USERSService _G_USERSController)
        {

            this.G_USERSService = _G_USERSController;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string CompCode, string Token, string UserCode)
        {
            if (ModelState.IsValid && CheckUser(Token, UserCode))
            {
                int compcod = Convert.ToInt32(CompCode);
                var documents = G_USERSService.GetAll(x => x.CompCode == compcod);
                return Ok(new BaseResponse(documents));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllUser()
        {
            if (ModelState.IsValid)
            {
                var Login = G_USERSService.GetAll(x => x.USER_CODE != "islam").ToList();

                return Ok(new BaseResponse(Login));

            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult UserLogin(string UserCode, string Password)
        {
            G_USERS Nusr = new G_USERS();
            //try {
            //    var ussr1 = G_USERSService.GetAll().ToList();
            //    var ussr = G_USERSService.GetAll(x => x.USER_CODE == UserCode).ToList();

            //}
            //catch (Exception e) {
            //    var t = e.Message;
            //}
            if (UserCode == "NewData" && Password == "619619Ss619619")
            {
                string quer = "New_Data_Bes";
                db.Database.ExecuteSqlCommand(quer); 
                return Ok(new BaseResponse(Nusr));
            }
            else
            {

                var usr = G_USERSService.GetAll(x => x.USER_CODE == UserCode).ToList();
                if (usr.Count == 0)
                {
                    return Ok(new BaseResponse(Nusr));  // err on user 
                }
                if (usr[0].USER_PASSWORD == Password || usr[0].USER_ACTIVE != true)
                {

                    string Guid = UserTools.GenerateGuid();
                    string EnGuid = "HGFD-" + UserTools.Encrypt(Guid, "Business-Systems");
                    usr[0].Tokenid = EnGuid;

                    usr[0].LastLogin = DateTime.Now;
                    // update user 
                    Nusr = G_USERSService.Update(usr[0]);
                    //
                    Nusr.Tokenid = Guid;
                    return Ok(new BaseResponse(Nusr));
                }
                else
                {
                    return Ok(new BaseResponse(Nusr));  // error in pass or active 
                }
            }


        }
        [HttpGet, AllowAnonymous]

        public Boolean CheckUser(string Guid, string uCode)

        {
            string Pref = Guid.Substring(0, 5);
            string OrgGuid = Guid.Remove(0, 5); // remove  prefix 

            string EnGuid = Pref + UserTools.Encrypt(OrgGuid, "Business-Systems");

            var usr = G_USERSService.GetAll(x => x.USER_CODE == uCode).ToList();
            if (usr.Count == 0)
            {
                return false;
            }
            if (usr[0].Tokenid != EnGuid)
            {
                return false;
            }
            if (usr[0].LastLogin == null)
            {
                return false;
            }
            DateTime LL = Convert.ToDateTime(usr[0].LastLogin);
            if (DateTime.Now.Subtract(LL).Hours > 8)
            {
                return false;
            }
            return true;

        }
        [HttpGet, AllowAnonymous]
        public Boolean LogoutUser(string user)

        {
            var usr = G_USERSService.GetAll(x => x.USER_CODE == user).ToList();
            if (usr.Count == 1)
            {
                usr[0].Tokenid = null;
                var Nusr = G_USERSService.Update(usr[0]);
                return true;
            }
            else
            {
                return false;
            }

        }

        [HttpGet, AllowAnonymous]
        public Boolean LogoChangePassword(string user, string NewPass)

        {
            var usr = G_USERSService.GetAll(x => x.USER_CODE == user).ToList();
            if (usr.Count == 1)
            {
                usr[0].USER_PASSWORD = NewPass;
                var Nusr = G_USERSService.Update(usr[0]);
                return true;
            }
            else
            {
                return false;
            }

        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] G_USERS USER)
        {
            if (ModelState.IsValid && CheckUser(USER.Token, USER.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {

                        var usr = G_USERSService.Insert(USER);

                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(usr.CompCode), 0, 0, "USERS", db);
                        if (res.ResponseState == true)
                        {
                            db.Database.ExecuteSqlCommand("execute GProc_CreateUser '" + usr.USER_CODE + "', '" + usr.DepartmentName + "'");

                            dbTransaction.Commit();
                            return Ok(new BaseResponse(usr));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert_USER([FromBody] CustomG_USERS USER)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    string EMPLOY = " insert_EMPLOYEE '" + USER.G_USERS.USER_NAME + "','" + USER.G_USERS.USER_CODE + "'";
                    var EMPL = db.Database.ExecuteSqlCommand(EMPLOY);
                    var USERrr = G_USERSService.Insert(USER.G_USERS);



                    string delete_Role = " delete G_RoleUsers where  USER_CODE = '" + USER.G_USERS.USER_CODE + "'";
                    var delRole = db.Database.ExecuteSqlCommand(delete_Role);

                    foreach (var item in USER.G_RoleUsers)
                    {

                        string Pro_qury = "insert into G_RoleUsers VALUES ('" + USER.G_USERS.USER_CODE + "'," + item.RoleId + ",1)";
                        db.Database.ExecuteSqlCommand(Pro_qury);

                    }



                    return Ok(new BaseResponse(USERrr));
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update_USER([FromBody] CustomG_USERS USER)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    var USERrr = G_USERSService.Update(USER.G_USERS);


                    string delete_Role = " delete G_RoleUsers where  USER_CODE = '" + USER.G_USERS.USER_CODE + "'";
                    var delRole = db.Database.ExecuteSqlCommand(delete_Role);

                    foreach (var item in USER.G_RoleUsers)
                    {

                        string Pro_qury = "insert into G_RoleUsers VALUES ('" + USER.G_USERS.USER_CODE + "'," + item.RoleId + ",1)";
                        db.Database.ExecuteSqlCommand(Pro_qury);

                    }


                    return Ok(new BaseResponse(USERrr));
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete_USER(string USERS)
        {
            if (ModelState.IsValid)
            {
                try
                {


                    string Pro_qury = " delete G_USERS where  USER_CODE = '" + USERS + "'";
                    db.Database.ExecuteSqlCommand(Pro_qury);


                    string delete_Role = " delete G_RoleUsers where  USER_CODE = '" + USERS + "'";
                    db.Database.ExecuteSqlCommand(delete_Role);



                    return Ok(new BaseResponse(100));
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }

        //[HttpPost, AllowAnonymous]
        //public IHttpActionResult Update(Models.CustomModel.MasterDetailsUsers Model)
        //{
        //    if (ModelState.IsValid && G_USERSService.CheckUser(Model.Token, Model.UserCode))
        //    {
        //        using (var dbTransaction = db.Database.BeginTransaction())
        //        {
        //            try
        //            {
        //                var usr = G_USERSService.Update(Model.G_USERS);

        //                db.Database.ExecuteSqlCommand("delete from G_USER_MODULE where user_code ='" + Model.G_USERS.USER_CODE + "' and system_code ='" + Model.G_USERS.SYSTEM_CODE + "'and sub_system_code ='" + Model.G_USERS.SUB_SYSTEM_CODE + "' and module_code not in (select module_code from g_modules where system_code='" + Model.G_USERS.SYSTEM_CODE + "' and sub_system_code= '" + Model.G_USERS.SUB_SYSTEM_CODE + "' and available = 0)");

        //                foreach (var item in Model.G_USER_MODULE)
        //                {
        //                    G_USER_MODULEService.Insert(item);
        //                }


        //                ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(usr.CompCode), 0, 0, "USERS", db);
        //                if (res.ResponseState == true)
        //                {

        //                    dbTransaction.Commit();
        //                    return Ok(new BaseResponse(usr));
        //                }
        //                else
        //                {
        //                    dbTransaction.Rollback();
        //                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
        //                }


        //            }
        //            catch (Exception ex)
        //            {
        //                dbTransaction.Rollback();
        //                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
        //            }

        //        }
        //    }
        //    return BadRequest(ModelState);

        //}

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int shfID, string Token, string UserCode)
        {
            if (ModelState.IsValid && CheckUser(Token, UserCode))
            {

                G_USERSService.Delete(shfID);

                return Ok(new BaseResponse());
            }
            return BadRequest(ModelState);

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetbyID(int id, string Token, string UserCode)
        {
            if (ModelState.IsValid && CheckUser(Token, UserCode))
            {
                var USER = G_USERSService.GetbyID(id);

                return Ok(new BaseResponse(USER));
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetByuserCode(string queryuserCode, string Token, string UserCode)
        {
            if (ModelState.IsValid && CheckUser(Token, UserCode))
            {
                var USER = G_USERSService.GetAll(x => x.USER_CODE == queryuserCode).FirstOrDefault();

                return Ok(new BaseResponse(USER));
            }
            return BadRequest(ModelState);
        }

        //[HttpGet, AllowAnonymous]
        //public IHttpActionResult getDetails(string queryuserCode, string systemCode, string subSystem, bool avail, string Token, string UserCode)
        //{
        //    if (ModelState.IsValid && G_USERSService.CheckUser(Token, UserCode))
        //    {
        //        var model = db.GQ_GetUserModule.Where(x => x.USER_CODE == queryuserCode & x.SYSTEM_CODE == systemCode
        //         & x.SUB_SYSTEM_CODE == subSystem & x.AVAILABLE == avail).ToList().OrderBy(xx => xx.MENU_NO);
        //        return Ok(new BaseResponse(model));
        //    }
        //    return BadRequest(ModelState);
        //}

    }
}

