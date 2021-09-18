using Inv.API.Models;
using Inv.API.Tools;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.BLL.Services.CompStatus;
namespace Inv.API.Controllers
{
    public class I_VW_GetCompStatusController : BaseController
    {
        private readonly II_VW_GetCompStatusService GetCompStatusService;
        
        public I_VW_GetCompStatusController(II_VW_GetCompStatusService _CompStatusService)
        {
            this.GetCompStatusService = _CompStatusService;
            
        }

        [HttpGet, AllowAnonymous]
           
        public IHttpActionResult GetAll(int Compcode)
        {

           if (ModelState.IsValid )               
            {

                var Control = GetCompStatusService.GetAll(x => x.CompCode == Compcode).FirstOrDefault();
                return Ok(new BaseResponse(Control));
            }
            return BadRequest(ModelState);
        }


        
       

    }
}