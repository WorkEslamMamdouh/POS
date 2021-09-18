using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    public class ResponseResult
    {

        public string ResponseMessage { get; set; }
        public object ResponseData { get; set; }
        public bool ResponseState { get; set; }

    }
}