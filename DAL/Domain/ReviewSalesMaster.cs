//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL.Domain
{
    using System;
    using System.Collections.Generic;
    
    public partial class ReviewSalesMaster
    {
        public int ID_ORDER_Delivery { get; set; }
        public string Date_Order_Delivery { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string CUSTOMER_ADDRES { get; set; }
        public string PHONE { get; set; }
        public string CUSTOMER_ADDRES_2 { get; set; }
        public Nullable<decimal> Total_All { get; set; }
        public string EMPLOYEE_NAME { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<int> EMPLOYEE_ID { get; set; }
        public Nullable<double> Tax { get; set; }
        public Nullable<bool> Confirmation { get; set; }
        public string USER_CODE { get; set; }
        public Nullable<int> CUSTOMER_ID { get; set; }
        public string type_order { get; set; }
        public string Name_Pilot { get; set; }
        public Nullable<int> Namber_Order_Delivery { get; set; }
    }
}
