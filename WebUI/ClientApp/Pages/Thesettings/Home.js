/// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
$(document).ready(function () {
    //debugger;
    Home.InitalizeComponent();
});
var Home;
(function (Home) {
    var TR_Type = "1";
    var Insert_Type;
    var AccountType = 1;
    var MSG_ID;
    var Details = new Array();
    var New_Details = new Array();
    var BilldIData = new Array();
    var ReportGrid = new JsGrid();
    var Model = new Table_Hagz();
    var sys = new SystemTools();
    var txt_Cust_Type;
    var btnback;
    var btnDelete;
    var btnAdd;
    var btnEdit;
    var btnEnter;
    var btnChange;
    var txt_NAME;
    var txt_MOBILE;
    var searchbutmemreport;
    //chkboxes
    var chkActive;
    var compcode; //SharedSession.CurrentEnvironment.CompCode;
    var IsNew;
    var index;
    //Selecteditem
    var Selecteditem;
    var CustomerIdUpdate = 0;
    var CustomerId;
    var sum_balance;
    var Debit;
    var Credit;
    var Valid = 0;
    var SearchDetails;
    var NewDetails = new Array();
    var modal;
    var span;
    var Name = "";
    var Phone = "";
    var Type = "";
    var Message = "";
    //var i;
    var veid = 0;
    var ID;
    function InitalizeComponent() {
        InitalizeControls();
        InitalizeEvents();
        Display();
    }
    Home.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //debugger;
        btnDelete = document.getElementById("btnDelete");
        btnAdd = document.getElementById("btnAdd");
        btnChange = document.getElementById("btnChange");
        modal = document.getElementById("myModal");
        span = document.getElementsByClassName("close")[0];
        //btnEdit = document.getElementById("btnedite") as HTMLButtonElement;
        btnEnter = document.getElementById("btnEnter");
        //btnback = document.getElementById("btnback") as HTMLButtonElement;
        txt_NAME = document.getElementById("txt_NAME");
        txt_MOBILE = document.getElementById("txt_NAssME");
        txt_Cust_Type = document.getElementById("txt_Cust_Type");
        //searchbutmemreport = document.getElementById("searchbutmemreport") as HTMLInputElement;
        ////textBoxes
    }
    function InitalizeEvents() {
        debugger;
        btnDelete.onclick = btnDelete_onclick;
        btnAdd.onclick = btnAdd_onclick;
        btnChange.onclick = btnChange_onclick;
        span.onclick = span_onclick;
        window.onclick = window_onclick;
        btnEnter.onclick = btnEnter_onClick;
        //btnback.onclick = btnback_onclick;
        //btnEdit.onclick = btnEdit_onclick;
        //searchbutmemreport.onkeyup = _SearchBox_Change;
    }
    function btnChange_onclick() {
        debugger;
        if (TR_Type == "2") {
            TR_Type = "1";
            btnChange.innerText = "الذهب الي حجز الاطفال";
        }
        else {
            TR_Type = "2";
            btnChange.innerText = " الذهب الي حجز الرجال";
        }
        Display();
    }
    function span_onclick() {
        modal.style.display = "none";
    }
    function window_onclick() {
        modal.style.display = "none";
    }
    function onClick() {
        debugger;
        modal.style.display = "block";
        var title = "رقم العميل ( 1 )ـ";
        var Labol = "Samah";
        var img = "";
        //var prgrph = $(this).attr('data_prgrph');
        var id_title = document.getElementById('id_title');
        //var id_img = document.getElementById('id_img');
        var id_Labol = document.getElementById('id_Labol');
        //var id_prgrph = document.getElementById('id_prgrph');
        id_title.innerHTML = title;
        id_Labol.innerHTML = Labol;
        //id_img.setAttribute('src', '' + img + '');
        //id_prgrph.innerHTML = prgrph;
        //alert(title);
        //modal.setAttribute('class', 'modal');
        //modal.style.display = "block";
    }
    function btnEdit_onclick() {
        IsNew = false;
    }
    //onclick
    function btnAdd_onclick() {
        debugger;
        //IsNew = true;
        insert_Table();
    }
    function Assign_Insert() {
        if (txt_Cust_Type.value == "Null") {
            alert('يجب اختيار النوع');
            return veid = 1;
        }
        else {
            if (txt_NAME.value == "") {
                Name = "Samah";
            }
            else {
                Name = txt_NAME.value;
            }
            if (txt_MOBILE.value == "") {
                Phone = "Samah";
            }
            else {
                Phone = txt_MOBILE.value;
            }
            if (txt_Cust_Type.value == "0") {
                Type = "1";
                Insert_Type = 1;
            }
            if (txt_Cust_Type.value == "1") {
                Type = "2";
                Insert_Type = 2;
            }
            Message = "Eslam";
        }
        return veid = 0;
    }
    function insert_Table() {
        Assign_Insert();
        if (veid != 1) {
            Ajax.Callsync({
                type: "Get",
                url: sys.apiUrl("Home", "PROC_insert_Table"),
                data: { Name: Name, Phone: Phone, Type: Type, Message: Message, TR_Type: Insert_Type },
                success: function (d) {
                    debugger;
                    var result = d;
                    if (result.IsSuccess) {
                        debugger;
                        BilldIData = result.Response;
                        if (BilldIData[0].Type == TR_Type) {
                            Details_Insert(BilldIData);
                        }
                    }
                }
            });
        }
    }
    function Details_Insert(BilldIData) {
        debugger;
        ID += 1;
        NewDetails[0] = { ID: ID, Num: BilldIData[0].Num, Name: Name, Phone: Phone, Type: Type, Message: Message, cheak: '0', StatusFlag: 'i' };
        Array.prototype.push.apply(Details, NewDetails);
        InitializeGrid();
        ReportGrid.DataSource = Details;
        ReportGrid.Bind();
    }
    function Validation() {
        //if (txt_CustomerCODE.value == "") {
        //    WorningMessage("يجب ادخال رقم المورد", "Contact Email Is Not Valid");
        //    Valid = 1;
        //}
        //if (CustomerFoundBefore() == false) {
        //    WorningMessage("رقم العميل موجود من قبل ", "Contact Email Is Not Valid");
        //    Valid = 1;
        //}
        //if (txt_NAME.value == "") {
        //    WorningMessage("يجب ادخال الاسم ", "Contact Email Is Not Valid");
        //    Valid = 1;
        //}
        //if (txt_Cust_Type.selectedIndex == 0) {
        //    WorningMessage("يجب اختيار النوع ", "Contact Email Is Not Valid");
        //    Valid = 1;
        //}
        //if (txt_Category.selectedIndex == 0) {
        //    WorningMessage("يجب اختيار الفئة ", "Contact Email Is Not Valid");
        //    Valid = 1;
        //}
        //if (txt_tax.selectedIndex == 0) {
        //    WorningMessage("يجب اختيار نوع الضريبة ", "Contact Email Is Not Valid");
        //    Valid = 1;
        //}
    }
    function CustomerFoundBefore() {
        //var res: boolean = true;
        //var code = txt_CustomerCODE.value;
        //Ajax.Callsync({
        //    type: "Get",
        //    url: sys.apiUrl("AccDefCustomer", "CodeFounBefore"),
        //    data: {
        //        code: code, compCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
        //    },
        //    success: (d) => {
        //        let result = d as BaseResponse;
        //        if (result.Response == 0) {
        //            res = true;
        //        }
        //        else
        //            res = false;
        //    }
        //});
        //return res;
    }
    function btnback_onclick() {
        $('#btnAddDetails').toggleClass("display_none");
        $('#btnEnter').toggleClass("display_none");
        $('#btnback').toggleClass("display_none");
        //$("#div_ContentData :input").attr("disabled", "true");
        $(".fa-minus-circle").addClass("display_none");
        $("#btnedite").removeClass("display_none");
        $("#btnedite").removeAttr("disabled");
        //$("#drpPaymentType").removeAttr("disabled");
        $("#drp_G_Store").removeAttr("disabled");
    }
    function btnDelete_onclick() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Home", "PROC_Delete_Rows"),
            data: { ID: Selecteditem[0].ID, TR_Type: TR_Type },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    debugger;
                    BilldIData = result.Response;
                    Delete_Rows(Selecteditem[0].Num);
                }
            }
        });
    }
    var indexBy = function (array, property) {
        var results = {};
        (array || []).forEach(function (object) {
            results[object[property]] = object;
        });
        return results;
    };
    function deleteRow(arr, row) {
        arr = arr.slice(0); // make copy
        arr.splice(row - 1, 1);
        return arr;
    }
    function reindexArray(array) {
        debugger;
        var index = 0; // The index where the element should be
        for (var key in array) {
            //if (parseInt(key) !== index)     // If the element is out of sequence
            //{
            array[index] = array[key]; // Move it to the correct, earlier position in the array
            ++index; // Update the index
        }
        array.splice(index); // Remove any remaining elements (These will be duplicates of earlier items)
    }
    ;
    function Delete_Rows(cnt) {
        debugger;
        var index = Details.map(function (e) { return e.Num; }).indexOf(cnt);
        $('#Num' + cnt).remove();
        delete Details[index];
        reindexArray(Details);
        InitializeGrid();
        ReportGrid.DataSource = Details;
        ReportGrid.Bind();
    }
    function btnEnter_onClick() {
        debugger;
        var validation_cheak = Details.filter(function (x) { return x.cheak == true; });
        if (validation_cheak.length < 4) {
            debugger;
            Enter_Customer(Selecteditem[0].ID);
        }
        else {
            alert("العدد مكتمل يجب اخراج احد");
        }
    }
    function DriverDoubleClick() {
        debugger;
        Selecteditem = Details.filter(function (x) { return x.ID == Number(ReportGrid.SelectedKey); });
        modal.style.display = "block";
        var title = "رقم الزبون ( " + Selecteditem[0].Num + " )";
        var Labol = Selecteditem[0].Name;
        var img = "";
        var id_title = document.getElementById('id_title');
        var id_Labol = document.getElementById('id_Labol');
        id_title.innerHTML = title;
        id_Labol.innerHTML = Labol;
    }
    function DisplayData(Selecteditem) {
        //DocumentActions.RenderFromModel(Selecteditem[0]);
        //$('#txt_Category').prop("value", Selecteditem[0].CatID);
        //debugger;
        //if (Selecteditem[0].IsCreditCustomer == false) {
        //    $('#txt_Cust_Type').prop("value", 0);
        //    $('#div_Balance').removeClass("display_none");
        //}
        //else {
        //    $('#txt_Cust_Type').prop("value", 1);
        //    //$('#txt_Openbalance').addClass("display_none");
        //    $('#div_Balance').addClass("display_none");
        //}
        //$('#txt_Grop').prop("value", Selecteditem[0].GroupId);
        //$('#txt_tax').prop("value", Selecteditem[0].VATType);
        //CustomerId = Selecteditem[0].CustomerId;
        //Debit = Selecteditem[0].Debit;
        //Credit = Selecteditem[0].Credit
        //$('#txt_balance').val((Selecteditem[0].Openbalance + Selecteditem[0].Debit - Selecteditem[0].Credit));
    }
    function EnableControls() {
    }
    function Enter_Rows(cnt) {
        $('#Num' + cnt).attr('class', 'Enter_Rows');
    }
    function Enter_Customer(New_ID) {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Home", "PROC_Enter_Customer"),
            data: { ID: New_ID, TR_Type: TR_Type },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    debugger;
                    Details = result.Response;
                    var length = Details.length;
                    length -= 1;
                    ID = Details[length].ID;
                    InitializeGrid();
                    ReportGrid.DataSource = Details;
                    ReportGrid.Bind();
                }
            }
        });
    }
    function Display() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Home", "GetAll"),
            data: { TR_Type: TR_Type },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    debugger;
                    Details = result.Response;
                    var length = Details.length;
                    length -= 1;
                    ID = Details[length].ID;
                    //for (var i = 0; i < Details.length; i++)
                    //{
                    //    Details[i].Num = 0;
                    //}
                    InitializeGrid();
                    ReportGrid.DataSource = Details;
                    ReportGrid.Bind();
                }
            }
        });
    }
    function _SearchBox_Change() {
        debugger;
        //if (searchbutmemreport.value != "") {
        //    let search: string = searchbutmemreport.value.toLowerCase();
        //    SearchDetails = BilldIData.filter(x => x.NAMEA.toLowerCase().search(search) >= 0 || x.NAMEE.toLowerCase().search(search) >= 0 || x.MOBILE.toLowerCase().search(search) >= 0
        //        || x.CustomerCODE.toString().search(search) >= 0 /* || x.CreditLimit.toString().search(search) >= 0 || x.Emp_NameA.toString().search(search) >= 0
        //        || x.ContactMobile.toString().search(search) >= 0 /*|| x.DueAmount.toString().search(search) >= 0 *//*|| x.DaysDiff.toString().search(search) >= 0*/);
        //    ReportGrid.DataSource = SearchDetails;
        //    ReportGrid.Bind();
        //} else {
        //    ReportGrid.DataSource = BilldIData;
        //    ReportGrid.Bind();
        //}
    }
    function InitializeGrid() {
        debugger;
        //let res: any = GetResourceList("");
        $("#id_ReportGrid").attr("style", "");
        ReportGrid.OnRowDoubleClicked = DriverDoubleClick;
        ReportGrid.ElementName = "ReportGrid";
        ReportGrid.PrimaryKey = "ID";
        ReportGrid.Paging = true;
        ReportGrid.PageSize = 10;
        ReportGrid.Sorting = true;
        //ReportGrid.InsertionMode = JsGridInsertionMode.Binding;
        ReportGrid.Editing = true;
        ReportGrid.Inserting = false;
        ReportGrid.SelectedIndex = 1;
        ReportGrid.OnItemEditing = function () { };
        ReportGrid.Columns = [
            { title: "ID", name: "ID", type: "text", width: "100px", visible: false },
            { title: "الرقم", name: "Num", type: "text", width: "50px", textField: "" },
            { title: "الاسم", name: "Name", type: "text", width: "80px" },
            { title: "رقم الجوال", name: "Phone", type: "text", width: "80px" },
            { title: "النوع", name: "Type", type: "text", width: "40px" },
            { title: "الحاله", name: "cheak", type: "text", width: "60px" },
        ];
        //ReportGrid.Bind();
    }
    function Assign() {
        //debugger;
        //var IsCredit_Type;
        //if ($('#txt_Cust_Type').val() == 0) {
        //    IsCredit_Type = false;
        //}
        //else {
        //    IsCredit_Type = true;
        //}
        //Model = new A_Rec_D_Customer();
        //if (IsNew == true) {
        //    DocumentActions.AssignToModel(Model);//Insert Update
        //    if (chkActive.checked) { Model.Isactive = true; }
        //    else { Model.Isactive = false; }
        //    Model.CompCode = Number(compcode);
        //    Model.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
        //    Model.UserCode = SysSession.CurrentEnvironment.UserCode;
        //    Model.CREATED_AT = DateTimeFormat(Date().toString());
        //    Model.CREATED_BY = SysSession.CurrentEnvironment.UserCode;
        //    Model.CatID = $('#txt_Category').val();
        //    Model.VATType = $('#txt_tax').val();
        //    Model.GroupId = $('#txt_Grop').val();
        //    Model.CustomerId = CustomerId;
        //    Model.DiscountplanID = Number("Null");
        //    Model.IsCreditCustomer = IsCredit_Type;
        //}
        //else {
        //    //  DocumentActions.RenderFromModel(Model);//Display
        //    DocumentActions.AssignToModel(Model);//Insert Update
        //    if (chkActive.checked) { Model.Isactive = true; }
        //    else { Model.Isactive = false; }
        //    Model.CompCode = Number(compcode);
        //    Model.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
        //    Model.UserCode = SysSession.CurrentEnvironment.UserCode;
        //    Model.UPDATED_AT = DateTimeFormat(Date().toString());
        //    Model.UPDATED_BY = SysSession.CurrentEnvironment.UserCode;
        //    Model.CustomerId = CustomerId;
        //    Model.CatID = $('#txt_Category').val();
        //    Model.VATType = $('#txt_tax').val();
        //    Model.GroupId = $('#txt_Grop').val();
        //    Model.DiscountplanID = Number("Null");
        //    Model.IsCreditCustomer = IsCredit_Type;
        //}
    }
    function Insert() {
        //Assign();
        //debugger
        //Ajax.Callsync({
        //    type: "POST",
        //    url: sys.apiUrl("AccDefCustomer", "Insert"),
        //    data: JSON.stringify(Model),
        //    success: (d) => {
        //        let result = d as BaseResponse;
        //        if (result.IsSuccess) {
        //            alert("تم الحفظ بنجاح");
        //            Valid = 0;
        //        } else {
        //            alert("هناك خطأ");
        //        }
        //    }
        //});
    }
    function Update() {
        //Assign();
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("AccDefCustomer", "Update"),
            data: JSON.stringify(Model),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    alert("تم الحفظ بنجاح");
                }
                else {
                    alert("هناك خطأ");
                }
            }
        });
    }
})(Home || (Home = {}));
//# sourceMappingURL=Home.js.map