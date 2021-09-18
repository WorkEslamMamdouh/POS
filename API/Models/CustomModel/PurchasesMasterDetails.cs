using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DAL.Domain;
using API.Models;
using API.Models.CustomEntities;

namespace API.Models.CustomModel
{
    public class PurchasesMasterDetails : SecurityClass
    {
        public Purchases_Master Purchases_Master { get; set; }
        public List<IQ_Purchases_Details> Purchases_Details { get; set; }
    }
}