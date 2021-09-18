using  API.Models; 
using  DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using  BLL.Services.GRole;
using BLL.Services.GUSERS;
using WebUl.API.Tools;

namespace API.Controllers
{
    public class G_RoleController : BaseController
    {
       private readonly IG_USERSService G_USERSService;
       private readonly IGRoleService GRoleService;

        public G_RoleController(IGRoleService GRoleService, IG_USERSService _G_USERSController) //, IG_USER_MODULEService _G_USER_MODULEService)
        {
           this.G_USERSService = _G_USERSController;
           this.GRoleService = GRoleService;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll( )
        {
            if (ModelState.IsValid)
            {
                var Roles = GRoleService.GetAll().ToList();
                return Ok(new BaseResponse(Roles));
            }
            return BadRequest(ModelState);
        }

    }
}

