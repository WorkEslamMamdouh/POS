var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
var SecurityClass = (function () {
    function SecurityClass() {
    }
    return SecurityClass;
}());
var FavModules = (function () {
    function FavModules() {
    }
    return FavModules;
}());
var SystemParameters = (function () {
    function SystemParameters() {
    }
    return SystemParameters;
}());
var APISessionRecord = (function () {
    function APISessionRecord() {
    }
    APISessionRecord.prototype.SetAPISession = function (key, value) {
        $.ajax({
            url: Url.Action("SetSessionRecordValue", "Session"),
            data: { propertyName: key, value: value },
            async: false
        });
    };
    APISessionRecord.prototype.GetAPISession = function (key) {
        var value = $.ajax({
            url: Url.Action("GetSessionRecordValue", "Session"),
            data: { propertyName: key },
            async: false
        }).responseJSON.result;
        return value;
    };
    Object.defineProperty(APISessionRecord.prototype, "SystemCode", {
        get: function () {
            return this.GetAPISession("SystemCode");
        },
        set: function (value) {
            this.SetAPISession("SystemCode", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "SubSystemCode", {
        get: function () {
            return this.GetAPISession("SubSystemCode");
        },
        set: function (value) {
            this.SetAPISession("SubSystemCode", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "Modulecode", {
        get: function () {
            return this.GetAPISession("Modulecode");
        },
        set: function (value) {
            this.SetAPISession("Modulecode", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "UserCode", {
        get: function () {
            return this.GetAPISession("UserCode");
        },
        set: function (value) {
            this.SetAPISession("UserCode", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "Token", {
        get: function () {
            return this.GetAPISession("Token");
        },
        set: function (value) {
            this.SetAPISession("Token", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "CompCode", {
        get: function () {
            return this.GetAPISession("CompCode");
        },
        set: function (value) {
            this.SetAPISession("CompCode", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "BranchCode", {
        get: function () {
            return this.GetAPISession("BranchCode");
        },
        set: function (value) {
            this.SetAPISession("BranchCode", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "CurrentYear", {
        get: function () {
            return this.GetAPISession("CurrentYear");
        },
        set: function (value) {
            this.SetAPISession("CurrentYear", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "ScreenLanguage", {
        get: function () {
            return this.GetAPISession("ScreenLanguage");
        },
        set: function (value) {
            this.SetAPISession("ScreenLanguage", value);
        },
        enumerable: true,
        configurable: true
    });
    return APISessionRecord;
}());
var EntityContext = (function () {
    function EntityContext() {
    }
    return EntityContext;
}());
var ResponseResult = (function () {
    function ResponseResult() {
    }
    return ResponseResult;
}());
var BaseResponse = (function () {
    function BaseResponse() {
    }
    return BaseResponse;
}());
var ReportParameters = (function () {
    function ReportParameters() {
    }
    return ReportParameters;
}());
var Settings_Report = (function () {
    function Settings_Report() {
        this.ID_Button_Print = "";
        this.Name_Report = "";
        this.Name_Stored_Report = "";
        this.Parameter_1 = "";
        this.Parameter_2 = "";
        this.Parameter_3 = "";
        this.Parameter_4 = "";
        this.Parameter_5 = "";
        this.Parameter_6 = "";
        this.Parameter_7 = "";
        this.Parameter_8 = "";
        this.Parameter_9 = "";
        this.Type_Print = 1;
    }
    return Settings_Report;
}());
var G_Role = (function (_super) {
    __extends(G_Role, _super);
    function G_Role() {
        var _this = _super.call(this) || this;
        _this.RoleId = 0;
        _this.DescA = "";
        _this.DescE = "";
        _this.Remarks = "";
        return _this;
    }
    return G_Role;
}(SecurityClass));
var G_RoleUsers = (function (_super) {
    __extends(G_RoleUsers, _super);
    function G_RoleUsers() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.RoleId = 0;
        _this.ISActive = false;
        _this.StatusFlag = "";
        return _this;
    }
    return G_RoleUsers;
}(SecurityClass));
var G_BRANCH = (function (_super) {
    __extends(G_BRANCH, _super);
    function G_BRANCH() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.BRA_CODE = 0;
        _this.BRA_DESC = "";
        _this.BRA_TYPE = 0;
        _this.BRA_DESCL = "";
        _this.BRA_SHORTA = "";
        _this.BRA_SHORTL = "";
        _this.REGION_CODE = "";
        _this.City = "";
        _this.Address = "";
        _this.Tel = "";
        _this.Fax = "";
        _this.Email = "";
        _this.WebSite = "";
        _this.BranchManager = "";
        _this.HRResponsible = "";
        _this.FinanceResponsible = "";
        _this.SalesManager = "";
        _this.CUSTOM1 = "";
        _this.CUSTOM2 = "";
        _this.CUSTOM3 = "";
        _this.CUSTOM4 = "";
        _this.CUSTOM5 = "";
        _this.CUSTOMFLAG1 = false;
        _this.CUSTOMFLAG2 = false;
        _this.CUSTOMNUM1 = 0;
        _this.CUSTOMNUM2 = 0;
        _this.CUSTOMDATE = "";
        _this.BRA_DESCE = "";
        return _this;
    }
    return G_BRANCH;
}(SecurityClass));
var I_VW_GetCompStatus = (function (_super) {
    __extends(I_VW_GetCompStatus, _super);
    function I_VW_GetCompStatus() {
        var _this = _super.call(this) || this;
        _this.CompCode = 0;
        _this.AddAble = false;
        _this.Editable = false;
        _this.CompStatus = 0;
        _this.LoginMsg;
        return _this;
    }
    return I_VW_GetCompStatus;
}(SecurityClass));
var G_COMPANY = (function (_super) {
    __extends(G_COMPANY, _super);
    function G_COMPANY() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.MOI_ID;
        _this.CRT_NO;
        _this.City = "";
        _this.Address = "";
        _this.Tel = "";
        _this.Fax = "";
        _this.Email = "";
        _this.WebSite = "";
        _this.GMName = "";
        _this.HRResponsible = "";
        _this.FinanceResponsible = "";
        _this.SalesManager = "";
        _this.CUSTOM1 = "";
        _this.CUSTOM2 = "";
        _this.CUSTOM3 = "";
        _this.CUSTOM4 = "";
        _this.CUSTOM5 = "";
        _this.CUSTOMFLAG1 = false;
        _this.CUSTOMFLAG2 = false;
        _this.CUSTOMNUM1 = 0;
        _this.CUSTOMNUM2 = 0;
        _this.CUSTOMDATE = "";
        _this.NameA = "";
        _this.NameE = "";
        return _this;
    }
    return G_COMPANY;
}(SecurityClass));
var G_MODULES = (function (_super) {
    __extends(G_MODULES, _super);
    function G_MODULES() {
        var _this = _super.call(this) || this;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.MODULE_CODE = "";
        _this.MENU_NO = "";
        _this.MENU_NAME = "";
        _this.MODULE_DESCE = "";
        _this.MODULE_DESCA = "";
        _this.CREATE = false;
        _this.EDIT = false;
        _this.DELETE = false;
        _this.PRINT = false;
        _this.VIEW = false;
        _this.CUSTOM1 = false;
        _this.CUSTOM2 = false;
        _this.CUSTOM3 = false;
        _this.CUSTOM1_DESC = "";
        _this.CUSTOM2_DESC = "";
        _this.CUSTOM3_DESC = "";
        _this.CUSTOM4 = false;
        _this.CUSTOM5 = false;
        _this.CUSTOM6 = false;
        _this.CUSTOM4_DESC = "";
        _this.CUSTOM5_DESC = "";
        _this.CUSTOM6_DESC = "";
        _this.CUSTOM7 = false;
        _this.CUSTOM8 = false;
        _this.CUSTOM9 = false;
        _this.CUSTOM7_DESC = "";
        _this.CUSTOM8_DESC = "";
        _this.CUSTOM9_DESC = "";
        _this.AVAILABLE = false;
        _this.MODULE_TYPE;
        _this.Images_Enabled = false;
        return _this;
    }
    return G_MODULES;
}(SecurityClass));
var LoginPage = (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage() {
        var _this = _super.call(this) || this;
        _this.ID_User = 0;
        _this.UserName = "";
        _this.password = "";
        _this.WepFormLoad = "";
        _this.Open_Login = false;
        return _this;
    }
    return LoginPage;
}(SecurityClass));
var SlsInvoiceTrNo_Or_ID = (function () {
    function SlsInvoiceTrNo_Or_ID() {
        this.TrNo = 0;
        this.ID_ORDER = 0;
    }
    return SlsInvoiceTrNo_Or_ID;
}());
var PRODUCT = (function () {
    function PRODUCT() {
        this.PRODUCT_ID = 0;
        this.PRODUCT_NAME = "";
        this.PRODUCT_QET = 0;
        this.PRODUCT_Purchasing_price = 0;
        this.PRODUCT_PRICE = 0;
        this.MinUnitPrice = 0;
        this.ID_CAT = 0;
        this.serial = "";
        this.TrType = 0;
        this.StatusFlag = "";
    }
    return PRODUCT;
}());
var ReviewSalesItemInfo = (function (_super) {
    __extends(ReviewSalesItemInfo, _super);
    function ReviewSalesItemInfo() {
        var _this = _super.call(this) || this;
        _this.ID_DELIVERY = 0;
        _this.Name_Product_sell = "";
        _this.Quantity_sell = 0;
        _this.price_One_part = 0;
        _this.Total_Price_One_Part = 0;
        _this.Notes_Order = "";
        _this.FK_ORDER_Delivery = 0;
        _this.MinUnitPrice = 0;
        _this.ID_CAT = 0;
        _this.PRODUCT_ID = 0;
        return _this;
    }
    return ReviewSalesItemInfo;
}(SecurityClass));
var ReviewSalesMaster = (function (_super) {
    __extends(ReviewSalesMaster, _super);
    function ReviewSalesMaster() {
        var _this = _super.call(this) || this;
        _this.ID_ORDER_Delivery = 0;
        _this.Date_Order_Delivery = "";
        _this.CUSTOMER_NAME = "";
        _this.CUSTOMER_ADDRES = "";
        _this.PHONE = "";
        _this.CUSTOMER_ADDRES_2 = "";
        _this.Total_All;
        _this.EMPLOYEE_NAME = "";
        _this.Date = "";
        _this.EMPLOYEE_ID = 0;
        _this.Tax = 0;
        _this.Confirmation = false;
        _this.USER_CODE = "";
        _this.CUSTOMER_ID = 0;
        _this.type_order = "";
        _this.Name_Pilot = "";
        _this.Namber_Order_Delivery = 0;
        return _this;
    }
    return ReviewSalesMaster;
}(SecurityClass));
var Table_Hagz = (function (_super) {
    __extends(Table_Hagz, _super);
    function Table_Hagz() {
        var _this = _super.call(this) || this;
        _this.ID = 0;
        _this.Num = 0;
        _this.Name = "";
        _this.Phone = "";
        _this.Type = "";
        _this.Message = "";
        _this.cheak = false;
        _this.StatusFlag = "";
        return _this;
    }
    return Table_Hagz;
}(SecurityClass));
var Table_Tim_work = (function (_super) {
    __extends(Table_Tim_work, _super);
    function Table_Tim_work() {
        var _this = _super.call(this) || this;
        _this.ID = 0;
        _this.Name = "";
        _this.Cheak = false;
        _this.StatusFlag = "";
        return _this;
    }
    return Table_Tim_work;
}(SecurityClass));
var G_SearchForm = (function (_super) {
    __extends(G_SearchForm, _super);
    function G_SearchForm() {
        var _this = _super.call(this) || this;
        _this.SearchFormCode = "";
        _this.ReturnDataPropertyName = "";
        _this.Description = "";
        _this.SerachFormTitle = "";
        _this.IsFullScreen = false;
        _this.Left = 0;
        _this.Top = 0;
        _this.Height = 0;
        _this.Width = 0;
        _this.PageSize = 0;
        _this.DataSourceName = "";
        _this.SearchInterval = 0;
        _this.SerachFormTitleA = "";
        return _this;
    }
    return G_SearchForm;
}(SecurityClass));
var G_SearchFormModule = (function (_super) {
    __extends(G_SearchFormModule, _super);
    function G_SearchFormModule() {
        var _this = _super.call(this) || this;
        _this.SystemCode = "";
        _this.SubSystemCode = "";
        _this.ModuleCode = "";
        _this.ControlCode = "";
        _this.SearchFormCode = "";
        return _this;
    }
    return G_SearchFormModule;
}(SecurityClass));
var G_SearchFormSetting = (function (_super) {
    __extends(G_SearchFormSetting, _super);
    function G_SearchFormSetting() {
        var _this = _super.call(this) || this;
        _this.SearchFormSettingID = 0;
        _this.SearchFormCode = "";
        _this.FieldSequence = 0;
        _this.DataMember = "";
        _this.AlternateDataMember = "";
        _this.FieldTitle = "";
        _this.IsReadOnly = false;
        _this.Datatype = 0;
        _this.FieldWidth = 0;
        _this.UseSelectionOperator = false;
        _this.Language = 0;
        _this.FieldTitleA = "";
        return _this;
    }
    return G_SearchFormSetting;
}(SecurityClass));
var G_STANDARD = (function (_super) {
    __extends(G_STANDARD, _super);
    function G_STANDARD() {
        var _this = _super.call(this) || this;
        _this.BACKUP_PATH = "";
        _this.BACKUP_DB = "";
        _this.BACKUP_COPIES = 0;
        return _this;
    }
    return G_STANDARD;
}(SecurityClass));
var G_SUB_SYSTEMS = (function (_super) {
    __extends(G_SUB_SYSTEMS, _super);
    function G_SUB_SYSTEMS() {
        var _this = _super.call(this) || this;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.SUB_SYSTEM_DESCA = "";
        _this.SUB_SYSTEM_DESCE = "";
        _this.ICON_PATH = "";
        _this.APPNAME = "";
        _this.APPVERSION = "";
        return _this;
    }
    return G_SUB_SYSTEMS;
}(SecurityClass));
var G_SYSTEM = (function (_super) {
    __extends(G_SYSTEM, _super);
    function G_SYSTEM() {
        var _this = _super.call(this) || this;
        _this.SYSTEM_CODE = "";
        _this.SYSTEM_DESCE = "";
        _this.SYSTEM_DESCA = "";
        _this.DB_NAME = "";
        _this.ICON_PATH = "";
        _this.INIT_ORDER = 0;
        _this.VER_PATH = "";
        return _this;
    }
    return G_SYSTEM;
}(SecurityClass));
var G_USER_BRANCH = (function (_super) {
    __extends(G_USER_BRANCH, _super);
    function G_USER_BRANCH() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.COMP_CODE = 0;
        _this.BRA_CODE = 0;
        _this.EXECUTE = false;
        _this.CREATE = false;
        _this.EDIT = false;
        _this.DELETE = false;
        _this.PRINT = false;
        _this.VIEW = false;
        return _this;
    }
    return G_USER_BRANCH;
}(SecurityClass));
var G_USER_COMPANY = (function (_super) {
    __extends(G_USER_COMPANY, _super);
    function G_USER_COMPANY() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.COMP_CODE = 0;
        _this.EXECUTE = false;
        _this.CREATE = false;
        _this.EDIT = false;
        _this.DELETE = false;
        _this.PRINT = false;
        _this.VIEW = false;
        return _this;
    }
    return G_USER_COMPANY;
}(SecurityClass));
var G_USER_LOG = (function (_super) {
    __extends(G_USER_LOG, _super);
    function G_USER_LOG() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.SYSTEM_CODE;
        _this.SYSTEM_YEAR = 0;
        _this.MODULE_CODE = "";
        _this.COMP_CODE = 0;
        _this.LOG_DATE = "";
        return _this;
    }
    return G_USER_LOG;
}(SecurityClass));
var ORDER_Master = (function (_super) {
    __extends(ORDER_Master, _super);
    function ORDER_Master() {
        var _this = _super.call(this) || this;
        _this.UserName = "";
        _this.Namber_Order_Delivery = 0;
        _this.Total_All = 0;
        _this.Date_Order_Delivery = "";
        _this.Tax = 0;
        _this.CUSTOMER_ID = 0;
        _this.type_order = "";
        _this.Confirmation = false;
        return _this;
    }
    return ORDER_Master;
}(SecurityClass));
var ORDER_DELIVERY = (function (_super) {
    __extends(ORDER_DELIVERY, _super);
    function ORDER_DELIVERY() {
        var _this = _super.call(this) || this;
        _this.ID_ORDER_Delivery = 0;
        _this.EMPLOYEE_ID = 0;
        _this.Namber_Order_Delivery = 0;
        _this.Date_Order_Delivery = "";
        _this.CUSTOMER_ID = 0;
        _this.Total_All;
        _this.Tax = 0;
        _this.type_order = "";
        _this.Name_Pilot = "";
        _this.Confirmation = false;
        _this.Num_Day = 0;
        return _this;
    }
    return ORDER_DELIVERY;
}(SecurityClass));
var SlsInvoiceMasterDetails = (function (_super) {
    __extends(SlsInvoiceMasterDetails, _super);
    function SlsInvoiceMasterDetails() {
        var _this = _super.call(this) || this;
        _this.I_Sls_TR_Invoice = new ORDER_Master();
        _this.I_Sls_TR_InvoiceItems = new Array();
        return _this;
    }
    return SlsInvoiceMasterDetails;
}(SecurityClass));
var SlsMasterDetails = (function (_super) {
    __extends(SlsMasterDetails, _super);
    function SlsMasterDetails() {
        var _this = _super.call(this) || this;
        _this.I_Sls_TR_Invoice = new ORDER_DELIVERY();
        _this.I_Sls_TR_InvoiceItems = new Array();
        return _this;
    }
    return SlsMasterDetails;
}(SecurityClass));
var PurchasesMasterDetails = (function (_super) {
    __extends(PurchasesMasterDetails, _super);
    function PurchasesMasterDetails() {
        var _this = _super.call(this) || this;
        _this.Purchases_Master = new Purchases_Master();
        _this.Purchases_Details = new Array();
        return _this;
    }
    return PurchasesMasterDetails;
}(SecurityClass));
var CustomG_USERS = (function (_super) {
    __extends(CustomG_USERS, _super);
    function CustomG_USERS() {
        var _this = _super.call(this) || this;
        _this.G_USERS = new G_USERS();
        _this.G_RoleUsers = new Array();
        return _this;
    }
    return CustomG_USERS;
}(SecurityClass));
var CUSTOMER = (function (_super) {
    __extends(CUSTOMER, _super);
    function CUSTOMER() {
        var _this = _super.call(this) || this;
        _this.CUSTOMER_ID = 0;
        _this.CUSTOMER_NAME = "";
        _this.CUSTOMER_ADDRES = "";
        _this.CUSTOMER_ADDRES_2 = "";
        _this.PHONE = "";
        _this.StatusFlag = "";
        return _this;
    }
    return CUSTOMER;
}(SecurityClass));
var Stok_ORDER_DELIVERY = (function (_super) {
    __extends(Stok_ORDER_DELIVERY, _super);
    function Stok_ORDER_DELIVERY() {
        var _this = _super.call(this) || this;
        _this.ID_DELIVERY = 0;
        _this.PRODUCT_ID = 0;
        _this.Quantity_sell = 0;
        _this.price_One_part = 0;
        _this.Total_Price_One_Part = 0;
        _this.Notes_Order = "";
        _this.FK_ORDER_Delivery = 0;
        _this.Name_Product_sell = "";
        _this.StatusFlag = "";
        return _this;
    }
    return Stok_ORDER_DELIVERY;
}(SecurityClass));
var IQ_Purchases_Master = (function (_super) {
    __extends(IQ_Purchases_Master, _super);
    function IQ_Purchases_Master() {
        var _this = _super.call(this) || this;
        _this.TrNo = 0;
        _this.Tr_Date = "";
        _this.ID_Supplier = 0;
        _this.Name_Supplier = "";
        _this.Type_Debit = false;
        _this.Type_Debit_Name = "";
        _this.Total_Amount = 0;
        _this.phone = "";
        _this.Type_Supplier = "";
        _this.Notes = "";
        _this.REMARKS = "";
        _this.IS_Active = false;
        _this.Paid_Up = 0;
        _this.To_be_Paid = 0;
        _this.CashPaidAmount = 0;
        return _this;
    }
    return IQ_Purchases_Master;
}(SecurityClass));
var IQ_Purchases_Details = (function (_super) {
    __extends(IQ_Purchases_Details, _super);
    function IQ_Purchases_Details() {
        var _this = _super.call(this) || this;
        _this.ID = 0;
        _this.TrNo = 0;
        _this.Name_CAT = "";
        _this.PRODUCT_NAME = "";
        _this.Purchases_Quantity = 0;
        _this.Purchases_Price = 0;
        _this.Sales_Price = 0;
        _this.MinUnitPrice = 0;
        _this.PRODUCT_ID = 0;
        _this.ID_CAT = 0;
        _this.ID_familly_Cat = 0;
        _this.PRODUCT_QET = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return IQ_Purchases_Details;
}(SecurityClass));
var familly_Cat = (function (_super) {
    __extends(familly_Cat, _super);
    function familly_Cat() {
        var _this = _super.call(this) || this;
        _this.ID_familly_Cat = 0;
        _this.Name_familly_Cat = "";
        _this.StatusFlag = '';
        return _this;
    }
    return familly_Cat;
}(SecurityClass));
var Purchases_Details = (function (_super) {
    __extends(Purchases_Details, _super);
    function Purchases_Details() {
        var _this = _super.call(this) || this;
        _this.ID = 0;
        _this.TrNo = 0;
        _this.ID_familly_Cat = 0;
        _this.ID_CAT = 0;
        _this.PRODUCT_ID = 0;
        _this.Purchases_Quantity = 0;
        _this.Purchases_Price;
        _this.Sales_Price;
        _this.MinUnitPrice;
        _this.StatusFlag = '';
        return _this;
    }
    return Purchases_Details;
}(SecurityClass));
var Purchases_Master = (function (_super) {
    __extends(Purchases_Master, _super);
    function Purchases_Master() {
        var _this = _super.call(this) || this;
        _this.TrNo = 0;
        _this.Tr_Date = "";
        _this.ID_Supplier = 0;
        _this.Type_Debit = false;
        _this.Total_Amount = 0;
        _this.Paid_Up = 0;
        _this.To_be_Paid = 0;
        _this.REMARKS = "";
        _this.Num_Day = 0;
        _this.CashPaidAmount = 0;
        return _this;
    }
    return Purchases_Master;
}(SecurityClass));
var The_Gard = (function (_super) {
    __extends(The_Gard, _super);
    function The_Gard() {
        var _this = _super.call(this) || this;
        _this.id_Num = 0;
        _this.PRODUCT_NAME = "";
        _this.PRODUCT_Purchasing_price = 0;
        _this.PRODUCT_PRICE = 0;
        _this.PRODUCT_Qut = 0;
        _this.Total_Price_One_Part = 0;
        _this.Shortage = 0;
        _this.Outlet = 0;
        _this.Task = 0;
        _this.Day_Date = "";
        _this.Shift_User = "";
        return _this;
    }
    return The_Gard;
}(SecurityClass));
var Supplier = (function (_super) {
    __extends(Supplier, _super);
    function Supplier() {
        var _this = _super.call(this) || this;
        _this.ID_Supplier = 0;
        _this.Name_Supplier = "";
        _this.phone = "";
        _this.Type_Supplier = "";
        _this.Notes = "";
        _this.IS_Active = false;
        _this.IS_Active_Name = "";
        return _this;
    }
    return Supplier;
}(SecurityClass));
var G_USER_MODULE = (function (_super) {
    __extends(G_USER_MODULE, _super);
    function G_USER_MODULE() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.MODULE_CODE = "";
        _this.EXECUTE = false;
        _this.CREATE = false;
        _this.EDIT = false;
        _this.DELETE = false;
        _this.PRINT = false;
        _this.VIEW = false;
        _this.CUSTOM1 = false;
        _this.CUSTOM2 = false;
        _this.CUSTOM3 = false;
        _this.CUSTOM4 = false;
        _this.CUSTOM5 = false;
        _this.CUSTOM6 = false;
        _this.CUSTOM7 = false;
        _this.CUSTOM8 = false;
        _this.CUSTOM9 = false;
        _this.ViewImages = false;
        _this.EditImages = false;
        return _this;
    }
    return G_USER_MODULE;
}(SecurityClass));
var G_USER_SUB_SYSTEM = (function (_super) {
    __extends(G_USER_SUB_SYSTEM, _super);
    function G_USER_SUB_SYSTEM() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.EXECUTE = false;
        _this.FILTER_STRING = "";
        return _this;
    }
    return G_USER_SUB_SYSTEM;
}(SecurityClass));
var G_USER_SYSTEM = (function (_super) {
    __extends(G_USER_SYSTEM, _super);
    function G_USER_SYSTEM() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.SYSTEM_CODE = "";
        _this.EXECUTE = false;
        _this.FILTER_STRING = "";
        return _this;
    }
    return G_USER_SYSTEM;
}(SecurityClass));
var G_USERS = (function (_super) {
    __extends(G_USERS, _super);
    function G_USERS() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.USER_PASSWORD = "";
        _this.USER_ACTIVE = false;
        _this.USER_ACTIVE_Name = "";
        _this.USER_NAME = "";
        _this.CompCode = 0;
        _this.REGION_CODE = "";
        _this.GRP_CODE = 0;
        _this.USER_PASSWORD2 = "";
        _this.CHANGE_PASS_DATE = "";
        _this.City = "";
        _this.Address = "";
        _this.Tel = "";
        _this.Fax = "";
        _this.Mobile = "";
        _this.Email = "";
        _this.DepartmentName = "";
        _this.JobTitle = "";
        _this.USER_TYPE = 0;
        _this.ManagedBy = "";
        _this.LoginUrl = false;
        _this.Tokenid = "";
        _this.LastLogin = "";
        _this.FirstLogin = "";
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CashBoxID = 0;
        _this.SalesManID = 0;
        return _this;
    }
    return G_USERS;
}(SecurityClass));
var I_Control = (function () {
    function I_Control() {
        this.CompCode = 0;
        this.IsVat = false;
        this.DefSlsVatType = 1;
        this.DefPurVatType = 1;
        this.VatNo = "";
        this.MobileLength = 0;
        this.IDLength = 0;
        this.SendSMS = false;
        this.SendEmail = false;
        this.SendPublicSMS = false;
        this.NotePeriodinSec = 0;
        this.DashBoardPeriodinSec = 0;
        this.MaxYearlyMSGs = 0;
        this.UsedMSGs = 0;
        this.UserTimeZoneUTCDiff = 0;
        this.ServerTimeZoneUTCDiff = 0;
        this.MaxImagesize = 0;
        this.SaudiNationID = 0;
        this.WebCustomerWebsite = false;
        this.ImgPath = "";
        this.MembeshiptStartDate = "";
        this.MembeshipEndDate = "";
        this.MembershipAllanceDays = 0;
        this.MembershipreadOnlyDays = 0;
    }
    return I_Control;
}());
var G_AlertLog = (function (_super) {
    __extends(G_AlertLog, _super);
    function G_AlertLog() {
        var _this = _super.call(this) || this;
        _this.AlertID = 0;
        _this.AlertTypeID = 0;
        _this.AlertSubTypeID = 0;
        _this.MemberID = 0;
        _this.MsgType = 0;
        _this.MsgDate = "";
        _this.MsgHeader = "";
        _this.MsgBody = "";
        _this.IsSent = false;
        _this.SendDate = "";
        _this.MobileNo = "";
        _this.Email = "";
        _this.SystemCode = "";
        _this.CompCode = 0;
        _this.TrID = 0;
        _this.AlertType = "";
        return _this;
    }
    return G_AlertLog;
}(SecurityClass));
var G_AlertControl = (function (_super) {
    __extends(G_AlertControl, _super);
    function G_AlertControl() {
        var _this = _super.call(this) || this;
        _this.Compcode = 0;
        _this.SystemCode = "";
        _this.EMAIL_SSL = false;
        _this.EMAIL_Authentication = false;
        _this.EMAIL_SenderName = "";
        _this.EMAIL_Sender = "";
        _this.EMAIL_SenderPassword = "";
        _this.EMAIL_SendorPort = 0;
        _this.EMAIL_SenderSMTP = "";
        _this.SMS_UserName = "";
        _this.SMS_SenderName = "";
        _this.SMS_Password = "";
        _this.MobileNoPreFex = "";
        return _this;
    }
    return G_AlertControl;
}(SecurityClass));
var G_ModuleHelp = (function (_super) {
    __extends(G_ModuleHelp, _super);
    function G_ModuleHelp() {
        var _this = _super.call(this) || this;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.MODULE_CODE = "";
        _this.HelpBody_Ar = "";
        _this.HelpBody_En = "";
        return _this;
    }
    return G_ModuleHelp;
}(SecurityClass));
var GQ_GetUserModule = (function (_super) {
    __extends(GQ_GetUserModule, _super);
    function GQ_GetUserModule() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.MODULE_CODE = "";
        _this.EXECUTE = false;
        _this.CREATE = false;
        _this.EDIT = false;
        _this.DELETE = false;
        _this.PRINT = false;
        _this.VIEW = false;
        _this.CUSTOM1 = false;
        _this.CUSTOM2 = false;
        _this.CUSTOM3 = false;
        _this.CUSTOM4 = false;
        _this.CUSTOM5 = false;
        _this.CUSTOM6 = false;
        _this.CUSTOM7 = false;
        _this.CUSTOM8 = false;
        _this.CUSTOM9 = false;
        _this.ViewImages = false;
        _this.EditImages = false;
        _this.MENU_NO = "";
        _this.MODULE_DESCE = "";
        _this.MODULE_DESCA = "";
        _this.M_CREATE = false;
        _this.M_EDIT = false;
        _this.M_DELETE = false;
        _this.M_VIEW = false;
        _this.M_PRINT = false;
        _this.M_CUSTOM1 = false;
        _this.M_CUSTOM2 = false;
        _this.M_CUSTOM3 = false;
        _this.M_CUSTOM4 = false;
        _this.M_CUSTOM5 = false;
        _this.M_CUSTOM6 = false;
        _this.M_CUSTOM7 = false;
        _this.M_CUSTOM8 = false;
        _this.M_CUSTOM9 = false;
        _this.CUSTOM1_DESC = "";
        _this.CUSTOM2_DESC = "";
        _this.CUSTOM3_DESC = "";
        _this.CUSTOM4_DESC = "";
        _this.CUSTOM5_DESC = "";
        _this.CUSTOM6_DESC = "";
        _this.CUSTOM7_DESC = "";
        _this.CUSTOM8_DESC = "";
        _this.CUSTOM9_DESC = "";
        _this.AVAILABLE = false;
        _this.M_images_enabled = false;
        return _this;
    }
    return GQ_GetUserModule;
}(SecurityClass));
var G_Noteifications = (function (_super) {
    __extends(G_Noteifications, _super);
    function G_Noteifications() {
        var _this = _super.call(this) || this;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.MODULE_CODE = "";
        _this.MODULE_DESCE = "";
        _this.MODULE_DESCA = "";
        _this.Remarks = "";
        _this.ISActive = false;
        _this.ActiveIcon = "";
        _this.InActiveIcon = "";
        _this.PageName = "";
        _this.DisplayOrder = 0;
        return _this;
    }
    return G_Noteifications;
}(SecurityClass));
var G_NotificationCompany = (function (_super) {
    __extends(G_NotificationCompany, _super);
    function G_NotificationCompany() {
        var _this = _super.call(this) || this;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.MODULE_CODE = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.ISActive = false;
        _this.NoteCount = 0;
        return _this;
    }
    return G_NotificationCompany;
}(SecurityClass));
var NoteificationsModel = (function (_super) {
    __extends(NoteificationsModel, _super);
    function NoteificationsModel() {
        var _this = _super.call(this) || this;
        _this.MODULE_CODE = "";
        _this.MODULE_DESCE = "";
        _this.MODULE_DESCA = "";
        _this.NoteCount = 0;
        return _this;
    }
    return NoteificationsModel;
}(SecurityClass));
var G_Codes = (function (_super) {
    __extends(G_Codes, _super);
    function G_Codes() {
        var _this = _super.call(this) || this;
        _this.ID = 0;
        _this.CodeType = "";
        _this.CodeValue = 0;
        _this.DescA = "";
        _this.DescE = "";
        _this.SubCode = "";
        _this.Remarks = "";
        return _this;
    }
    return G_Codes;
}(SecurityClass));
var CATEGRES = (function (_super) {
    __extends(CATEGRES, _super);
    function CATEGRES() {
        var _this = _super.call(this) || this;
        _this.ID_CAT = 0;
        _this.Name_CAT = "";
        _this.ID_familly_Cat = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return CATEGRES;
}(SecurityClass));
var KQ_GetAlertNoteLog = (function (_super) {
    __extends(KQ_GetAlertNoteLog, _super);
    function KQ_GetAlertNoteLog() {
        var _this = _super.call(this) || this;
        _this.NoteType = 0;
        _this.NoteSubType = 0;
        _this.MemberID = 0;
        _this.MsgDate = "";
        _this.MsgText = "";
        _this.IsSent = false;
        _this.AlertID = 0;
        return _this;
    }
    return KQ_GetAlertNoteLog;
}(SecurityClass));
//class KQ_GetNews extends SecurityClass {
//    constructor() {
//        super();
//        this.NewsID = 0;
//        this.NewsTypeCode = 0;
//        this.NewsToCode = 0;
//        this.NewsDate = "";
//        this.NewsExpiry = "";
//        this.NewsText = "";
//        this.CompCode = 0;
//        this.BranchCode = 0;
//        this.NewsType_DescA = "";
//        this.NewsType_DescE = "";
//        this.NewsTo_DescA = "";
//        this.NewsTo_DescE = "";
//        this.SubCode = "";
//        this.Selected = false;
//    }
//    public NewsID: number;
//    public NewsTypeCode: number;
//    public NewsToCode: number;
//    public NewsDate: string;
//    public NewsExpiry: string;
//    public NewsText: string;
//    public CompCode: number;
//    public BranchCode: number;
//    public NewsType_DescA: string;
//    public NewsType_DescE: string;
//    public NewsTo_DescA: string;
//    public NewsTo_DescE: string;
//    public SubCode: string;
//    public Selected: boolean;
//}
var G_News = (function (_super) {
    __extends(G_News, _super);
    function G_News() {
        var _this = _super.call(this) || this;
        _this.NewsID = 0;
        _this.NewsTypeCode = 0;
        _this.NewsToCode = 0;
        _this.NewsDate = "";
        _this.NewsExpiry = "";
        _this.NewsText = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        return _this;
    }
    return G_News;
}(SecurityClass));
//# sourceMappingURL=Entities.js.map