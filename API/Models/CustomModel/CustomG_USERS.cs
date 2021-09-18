using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DAL.Domain;
using API.Models;
using API.Models.CustomEntities;

namespace API.Models.CustomModel
{
    public class CustomG_USERS : SecurityClass
    {
        public G_USERS G_USERS { get; set; }
        public List<G_RoleUsers> G_RoleUsers { get; set; }
    }
}