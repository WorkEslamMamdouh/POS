using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Unity;
using System.Web.Http.Dependencies;
using BLL.Services.GUSERS;
using BLL.Services.Item;
using BLL.Services.Category;
using BLL.Services.insert_Table;
using BLL.Services.SlsTrSales;
using BLL.Services.Customer;
using BLL.Services.Outletpirce;
using BLL.Services.Stok_ORDER;
using BLL.Services.Vendor;
using BLL.Services.Purchases;
using BLL.Services.familly_Cate;
using BLL.Services.GRole;
using BLL.Services.GRoleUsers;
using WebUl.DAL.Repository;

namespace Infrastructure
{
    public static class IocConfigurator
    {

        public static void RegisterServices(IUnityContainer container)
        {
            container.RegisterType<IUnitOfWork, UnitOfWork>();
            container.RegisterType<IG_USERSService, G_USERSService>();
            container.RegisterType<Iinsert_TableServices, insert_TableServices>();
            container.RegisterType<IItemServices, ItemServices>();
            container.RegisterType<ICategoryServices, CategoryServices>();
            container.RegisterType<ISlsTrSalesServices, SlsTrSalesServices>();
            container.RegisterType<ICustomerServices, CustomerServices>();
            container.RegisterType<IOutletpirceServices, OutletpirceServices>();
            container.RegisterType<IStok_ORDERServices, Stok_ORDERServices>();
            container.RegisterType<IVendorServices, VendorServices>();
            container.RegisterType<IPurchases_MasterServices, Purchases_MasterServices>();
            container.RegisterType<Ifamilly_CatServices, familly_CatServices>();
            container.RegisterType<IGRoleService, GRoleService>();
            container.RegisterType<IGRoleUsersService, GRoleUsersService>();



        }
    }
}