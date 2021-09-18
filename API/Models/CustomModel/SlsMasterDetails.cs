using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DAL.Domain;
using API.Models;
using API.Models.CustomEntities;

namespace API.Models.CustomModel
{
    public class SlsMasterDetails : SecurityClass
    {
        public ORDER_DELIVERY I_Sls_TR_Invoice { get; set; }
        public List<Stok_ORDER_DELIVERY> I_Sls_TR_InvoiceItems { get; set; }
    }
}