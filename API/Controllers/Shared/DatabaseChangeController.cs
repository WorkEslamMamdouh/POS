 using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebUl.API.Tools;

namespace Inv.API.Controllers
{
    public class DatabaseChangeController : ApiController
    {
        

        [HttpGet]
        public void SetSelectedYear(string year)
        {
            Shared.Session.SelectedYear = year;
                        
        }
    }
}
