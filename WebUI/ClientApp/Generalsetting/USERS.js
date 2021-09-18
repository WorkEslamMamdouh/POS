$(document).ready(function () {
    USERS.InitalizeComponent();
});
var USERS;
(function (USERS_1) {
    // Arrays
    var AccountType = 2;
    var MSG_ID;
    var chack_USER_CODE = new Array();
    var Details = new Array();
    var Display = new Array();
    var SearchDetails = new Array();
    var BilldIData = new Array();
    var Model = new G_USERS();
    var UserDetails = new Array();
    var List_RoleDetails = new Array();
    var List_Roles = new Array();
    var List_Singl_Roles = new G_RoleUsers();
    var OperationSingleModel = new G_RoleUsers();
    var OperationModel_dital = new Array();
    var CustomG_USERS_Model = new CustomG_USERS();
    var ReportGrid = new JsGrid();
    var CashDetailsAr = new Array();
    var CashDetailsEn = new Array();
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var ddlUserMaster;
    var btnback;
    var btnShow;
    var btnAdd;
    var btnEdit;
    var btnDelet;
    var btnsave;
    var btnAddDetails;
    var btnGive_assignments;
    var btnBlock_permissions;
    var btnLoadRoles;
    var searchbutmemreport;
    var txtUSER_CODE;
    var chk_IsActive;
    var drpRoles;
    var compcode; //SharedSession.CurrentEnvironment.CompCode;
    var IsNew = false;
    var index;
    var Selecteditem = new Array();
    var CustomerIdUpdate = 0;
    var CustomerId;
    var CountGrid = 0;
    var sum_balance;
    var Debit;
    var Credit;
    var Valid = 0;
    var Update_claenData = 0;
    var txt_ID_APP_Category;
    var StatusFlag;
    function InitalizeComponent() {
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "الاعدادات";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "sitinge";
        }
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitalizeEvents();
        FillddlUserMaster();
        Display_All();
        fillRoles();
    }
    USERS_1.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btnShow = document.getElementById("btnShow");
        btnAdd = document.getElementById("btnAdd");
        btnEdit = document.getElementById("btnedite");
        btnDelet = document.getElementById("btnDelet");
        btnsave = document.getElementById("btnsave");
        btnback = document.getElementById("btnback");
        btnAddDetails = document.getElementById("btnAddDetails");
        ddlUserMaster = document.getElementById("ddlUserMaster");
        searchbutmemreport = document.getElementById("searchbutmemreport");
        txtUSER_CODE = document.getElementById("txtUSER_CODE");
        drpRoles = document.getElementById("drpRoles");
        chk_IsActive = document.getElementById("chk_IsActive");
        btnGive_assignments = document.getElementById("btnGive_assignments");
        btnBlock_permissions = document.getElementById("btnBlock_permissions");
        btnLoadRoles = document.getElementById("btnLoadRoles");
    }
    function InitalizeEvents() {
        btnShow.onclick = btnShow_onclick;
        btnAdd.onclick = btnAdd_onclick;
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
        btnEdit.onclick = btnEdit_onclick;
        btnDelet.onclick = btnDelet_onclick;
        searchbutmemreport.onkeyup = _SearchBox_Change;
        txtUSER_CODE.onchange = chack_USER;
        btnAddDetails.onclick = AddNewRow;
        btnGive_assignments.onclick = Give_assignments_onClick;
        btnBlock_permissions.onclick = Block_permissions_onClick;
        btnLoadRoles.onclick = btnLoadRoles_onClick;
        //drpRoles.onchange = drpRoles_change;
    }
    function FillddlUserMaster() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_USERS", "GetAllUser"),
            data: {},
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Details = result.Response;
                    debugger;
                    DocumentActions.FillCombowithdefult(Details, ddlUserMaster, "USER_CODE", "USER_CODE", "اختار المستخدم");
                }
            }
        });
    }
    function Display_All() {
        //debugger;
        var USER_CODE = ddlUserMaster.value;
        var Active = $('#txt_Active').val();
        if (USER_CODE != 'null' && Active == 2) {
            Display = Details.filter(function (s) { return s.USER_CODE == USER_CODE; });
        }
        if (USER_CODE != 'null' && Active != 2) {
            Display = Details.filter(function (s) { return s.USER_CODE == USER_CODE && s.USER_ACTIVE == Active; });
        }
        if (USER_CODE == 'null' && Active != 2) {
            Display = Details.filter(function (s) { return s.USER_ACTIVE == Active; });
        }
        if (USER_CODE == 'null' && Active == 2) {
            Display = Details;
        }
        for (var i = 0; i < Display.length; i++) {
            Display[i].USER_ACTIVE_Name = Display[i].USER_ACTIVE == false ? 'غير فعال' : 'فعال';
        }
        InitializeGrid();
        ReportGrid.DataSource = Display;
        ReportGrid.Bind();
    }
    function _SearchBox_Change() {
        debugger;
        if (searchbutmemreport.value != "") {
            var search_1 = searchbutmemreport.value.toLowerCase();
            SearchDetails = Display.filter(function (x) { return x.USER_NAME.toLowerCase().search(search_1) >= 0; });
            ReportGrid.DataSource = SearchDetails;
            ReportGrid.Bind();
        }
        else {
            ReportGrid.DataSource = Display;
            ReportGrid.Bind();
        }
    }
    function btnDelet_onclick() {
        WorningMessage(" هل تريد الحذف؟ (" + $('#txtUSER_NAME').val() + ")", "Do you want to delete?", "تحذير", "worning", function () {
            Delete();
        });
    }
    function btnEdit_onclick() {
        IsNew = false;
        removedisabled();
        remove_disabled_Grid_Controls();
        $('#btnsave').toggleClass("display_none");
        $('#btnback').toggleClass("display_none");
        $('#btnDelet').toggleClass("display_none");
        $("#div_ContentData :input").removeAttr("disabled");
        $("#btnedite").toggleClass("display_none");
        $("#txt_ID_Supplier").attr("disabled", "disabled");
        $("#id_div_Add").attr("disabled", "disabled").off('click');
        var x1 = $("#id_div_Add").hasClass("disabledDiv");
        (x1 == true) ? $("#id_div_Add").removeClass("disabledDiv") : $("#id_div_Add").addClass("disabledDiv");
        $(".btnAddDetails").removeAttr("disabled");
        //$('#btnAddDetails').toggleClass("display_none");
        $(".fa-minus-circle").removeClass("display_none");
        $("#txtUSER_CODE").attr("disabled", "disabled");
    }
    function btnAdd_onclick() {
        debugger;
        IsNew = true;
        EnableControls();
        removedisabled();
        $("#id_div_Add").attr("disabled", "disabled").off('click');
        var x1 = $("#id_div_Add").hasClass("disabledDiv");
        (x1 == true) ? $("#id_div_Add").removeClass("disabledDiv") : $("#id_div_Add").addClass("disabledDiv");
        $('#div_Data').html("");
        CountGrid = 0;
        //reference_Page();
        Valid = 0;
    }
    function btnsave_onClick() {
        debugger;
        if (IsNew == true) {
            Validation();
            if (Valid == 1) {
            }
            else {
                Insert();
            }
        }
        else {
            Validation();
            if (Valid == 1) {
            }
            else {
                Update();
            }
        }
    }
    function chack_USER() {
        if ($('#txtUSER_CODE').val() != "") {
            chack_USER_CODE = Details.filter(function (s) { return s.USER_CODE == $('#txtUSER_CODE').val(); });
            if (Selecteditem[0].USER_CODE != chack_USER_CODE[0].USER_CODE) {
                if (chack_USER_CODE.length > 0) {
                    MessageBox.Show("لا يمكن تكرار أسم المستخدم", " ");
                    $('#txtUSER_CODE').val('');
                }
            }
        }
    }
    function Validation() {
        if ($('#txtUSER_NAME').val() == "") {
            MessageBox.Show("يجب ادخال اسم الموظف ", "Contact Email Is Not Valid");
            Errorinput($('#txtUSER_NAME'));
            return Valid = 1;
        }
        if ($('#txtDepartmentName').val() == "") {
            MessageBox.Show("يجب ادخال القسم ", "Contact Email Is Not Valid");
            Errorinput($('#txtDepartmentName'));
            return Valid = 1;
        }
        if ($('#txtJobTitle').val() == "") {
            MessageBox.Show("يجب ادخال  الوظيفة ", "Contact Email Is Not Valid");
            Errorinput($('#txtJobTitle'));
            return Valid = 1;
        }
        if ($('#txtMobile').val() == "") {
            MessageBox.Show("يجب ادخال الموبيل ", "Contact Email Is Not Valid");
            Errorinput($('#txtMobile'));
            return Valid = 1;
        }
        if ($('#txtUSER_CODE').val() == "") {
            MessageBox.Show("يجب ادخال  إسم المستخدم   ", "Contact Email Is Not Valid");
            Errorinput($('#txtUSER_CODE'));
            return Valid = 1;
        }
        if ($('#txtUSER_PASSWORD').val() == "") {
            MessageBox.Show("يجب ادخال كلمة السر   ", "Contact Email Is Not Valid");
            Errorinput($('#txtUSER_PASSWORD'));
            return Valid = 1;
        }
        if ($('#txtUSER_PASSWORD_confirm').val() != $('#txtUSER_PASSWORD').val()) {
            MessageBox.Show("كلمتى السر غير متوافقين", "Contact Email Is Not Valid");
            Errorinput($('#txtUSER_PASSWORD_confirm'));
            return Valid = 1;
        }
        return Valid = 0;
    }
    function btnShow_onclick() {
        Display_All();
    }
    function btnback_onclick() {
        Selecteditem = Details.filter(function (x) { return x.USER_CODE == ReportGrid.SelectedKey; });
        if (Selecteditem.length == 0) {
            IsNew = true;
        }
        if (IsNew == true) {
            //$('#btnAddDetails').toggleClass("display_none");
            $('#btnsave').toggleClass("display_none");
            $('#btnback').toggleClass("display_none");
            $('#btnDelet').toggleClass("display_none");
            $(".fa-minus-circle").addClass("display_none");
            $("#btnedite").removeClass("display_none");
            $("#btnedite").removeAttr("disabled");
            txt_disabled();
            if (Valid != 2) {
                $("#Div_control").attr("style", " margin-bottom: 19px;margin-top: 20px;display: none;");
            }
            $("#id_div_Add").attr("disabled", "");
            $("#id_div_Add").removeClass("disabledDiv");
            disabled_Grid_Controls();
        }
        else {
            //$('#btnAddDetails').toggleClass("display_none");
            $('#btnsave').toggleClass("display_none");
            $('#btnback').toggleClass("display_none");
            $('#btnDelet').toggleClass("display_none");
            $(".fa-minus-circle").addClass("display_none");
            $("#btnedite").removeClass("display_none");
            $("#btnedite").removeAttr("disabled");
            txt_disabled();
            Update_claenData = 0;
            $("#id_div_Add").attr("disabled", "");
            $("#id_div_Add").removeClass("disabledDiv");
            DriverDoubleClick();
            disabled_Grid_Controls();
        }
        $('#btnDelet').addClass("display_none");
    }
    function EnableControls() {
        debugger;
        $("#Div_control").attr("style", " margin-bottom: 19px;margin-top: 20px;");
        $('#btnsave').removeClass("display_none");
        $('#btnback').removeClass("display_none");
        $('#btnedite').attr('class', 'btn btn-primary display_none');
        chk_IsActive.checked = false;
        $("#txtUSER_NAME").val("");
        $("#txtDepartmentName").val("");
        $("#txtJobTitle").val("");
        $("#txtMobile").val("");
        $("#txtAddress").val("");
        $("#txtUSER_CODE").val("");
        $("#txtUSER_PASSWORD").val("");
        $("#txtUSER_PASSWORD_confirm").val("");
        $("#txtFirstLogin").val("");
        $("#txtLastLogin").val("");
    }
    function txt_disabled() {
        $("#txtUSER_NAME").attr("disabled", "disabled");
        $("#txtDepartmentName").attr("disabled", "disabled");
        $("#chk_IsActive").attr("disabled", "disabled");
        $("#txtJobTitle").attr("disabled", "disabled");
        $("#txtMobile").attr("disabled", "disabled");
        $("#txtAddress").attr("disabled", "disabled");
        $("#txtUSER_CODE").attr("disabled", "disabled");
        $("#txtUSER_PASSWORD").attr("disabled", "disabled");
        $("#txtUSER_PASSWORD_confirm").attr("disabled", "disabled");
        $("#btnGive_assignments").attr("disabled", "disabled");
        $("#btnBlock_permissions").attr("disabled", "disabled");
        $("#btnLoadRoles").attr("disabled", "disabled");
    }
    function removedisabled() {
        //debugger;
        $("#txtUSER_NAME").removeAttr("disabled");
        $("#txtDepartmentName").removeAttr("disabled");
        $("#chk_IsActive").removeAttr("disabled");
        $("#txtJobTitle").removeAttr("disabled");
        $("#txtMobile").removeAttr("disabled");
        $("#txtAddress").removeAttr("disabled");
        $("#txtUSER_CODE").removeAttr("disabled");
        $("#txtUSER_PASSWORD").removeAttr("disabled");
        $("#txtUSER_PASSWORD_confirm").removeAttr("disabled");
        $("#btnGive_assignments").removeAttr("disabled");
        $("#btnBlock_permissions").removeAttr("disabled");
        $("#btnLoadRoles").removeAttr("disabled");
    }
    function remove_disabled_Grid_Controls() {
        //$(".fontitm3").removeClass("display_none");
        for (var i = 0; i < CountGrid + 1; i++) {
            //$("#txtDescA" + i).removeAttr("disabled");
            $("#CheckISActive" + i).removeAttr("disabled");
            $("#txt_StatusFlag" + i).val("");
        }
    }
    function disabled_Grid_Controls() {
        //$(".fontitm3").addClass("display_none");
        for (var i = 0; i < CountGrid + 1; i++) {
            $("#txtDescA" + i).attr("disabled", "disabled");
            $("#CheckISActive" + i).attr("disabled", "disabled");
            $("#txt_StatusFlag" + i).val("");
        }
    }
    function fillRoles() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_Role", "GetAll"),
            data: {},
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    List_RoleDetails = result.Response;
                    var DetLst = List_RoleDetails.filter(function (x) { return x.DescA == 'admin'; });
                    var index = List_RoleDetails.indexOf(DetLst[0]);
                    Delete_Rows(index, List_RoleDetails);
                }
            }
        });
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
    function Delete_Rows(ind, array) {
        delete array[ind];
        reindexArray(array);
    }
    function InitializeGrid() {
        var res = GetResourceList("");
        $("#id_ReportGrid").attr("style", "");
        ReportGrid.OnRowDoubleClicked = DriverDoubleClick;
        ReportGrid.ElementName = "ReportGrid";
        ReportGrid.PrimaryKey = "USER_CODE";
        ReportGrid.Paging = true;
        ReportGrid.PageSize = 10;
        ReportGrid.Sorting = true;
        ReportGrid.InsertionMode = JsGridInsertionMode.Binding;
        ReportGrid.Editing = false;
        ReportGrid.Inserting = false;
        ReportGrid.SelectedIndex = 1;
        ReportGrid.OnItemEditing = function () { };
        ReportGrid.Columns = [
            { title: "الرقم", name: "USER_CODE", type: "text", width: "100px", visible: false },
            { title: "اسم الموظف", name: "USER_NAME", type: "text", width: "100px" },
            { title: "رقم الجوال", name: "Mobile", type: "text", width: "100px" },
            { title: "النوع", name: "JobTitle", type: "text", width: "100px" },
            { title: "مفعل", name: "USER_ACTIVE_Name", type: "textdd", width: "100px" },
        ];
        ReportGrid.Bind();
    }
    function DriverDoubleClick() {
        ////debugger
        Selecteditem = Details.filter(function (s) { return s.USER_CODE == ReportGrid.SelectedKey; });
        DocumentActions.RenderFromModel(Selecteditem[0]);
        $('#btnedite').removeClass("display_none");
        $('#btnsave').addClass("display_none");
        $('#btnback').addClass("display_none");
        $('#btnedite').removeAttr("disabled");
        if (Selecteditem[0].USER_ACTIVE == true) {
            chk_IsActive.checked = true;
        }
        else {
            chk_IsActive.checked = false;
        }
        BindGetOperationItemsGridData(Selecteditem[0].USER_CODE);
        $("#Div_control").attr("style", " margin-bottom: 19px;margin-top: 20px;");
    }
    function BindGetOperationItemsGridData(USER_CODE) {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_RoleUsers", "GetAll"),
            data: { USER_CODE: USER_CODE },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    List_Roles = result.Response;
                    $("#div_Data").html('');
                    for (var i = 0; i < List_Roles.length; i++) {
                        BuildControls(i);
                        Disbly_BuildControls(i, List_Roles);
                        CountGrid = i;
                    }
                    $("#txtItemCount").val(CountGrid);
                }
            }
        });
    }
    function BuildControls(cnt) {
        var html;
        html = '<div id="No_Row' + cnt + '" class="col-lg-12" >' +
            '<div class="col-lg-3" style="width: 9%;"><span id="btn_minus' + cnt + '" class="glyphicon glyphicon-remove-sign fontitm3  minus_btn display_none" style="font-size: 23px;"></span></div>' +
            '<div class="col-lg-8 style_pading"><select id="txtDescA' + cnt + '" disabled class="form-control"><option value="Null">اختر المهمه</option></select></div>' +
            //'<div class="col-lg-7 style_pading"> <input id="txtRemarks' + cnt + '" type= "text" class="form-control " disabled="disabled"/></div>' +
            '<div class="col-lg-2 style_pading"> <input id="CheckISActive' + cnt + '"  type= "checkbox"  class="form-control " disabled="disabled" /></div>' +
            '<div class="col-lg-12"> <input id = "txt_StatusFlag' + cnt + '" name = " " type = "hidden"   class="form-control"/></div>' +
            '<div class="col-lg-12"> <input id = "txtRoleId' + cnt + '" name = " " type = "hidden" class="form-control"/></div>' +
            '</div>';
        $("#div_Data").append(html);
        $("#btn_minus" + cnt).on('click', function () {
            WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", function () {
                $("#No_Row" + cnt).attr("hidden", "true");
                $("#txt_StatusFlag" + cnt).val("d");
            });
        });
        $("#txtCode" + cnt).on('change', function () {
            //Validate_code(cnt);
        });
        $("#CheckISActive" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != 'i') {
                $("#txt_StatusFlag" + cnt).val('u');
            }
        });
        if (SysSession.CurrentPrivileges.Remove) {
            $("#btn_minus" + cnt).removeAttr("disabled");
        }
        else {
            $("#btn_minus" + cnt).attr("disabled", "disabled");
        }
        for (var i = 0; i < List_RoleDetails.length; i++) {
            $('#txtDescA' + cnt).append('<option value="' + List_RoleDetails[i].RoleId + '">' + List_RoleDetails[i].DescA + '</option>');
        }
        return;
    }
    function Disbly_BuildControls(cnt, AllGetStokItemInfo) {
        debugger;
        $("#btnAddDetails").addClass("display_none");
        $("#btn_minus" + cnt).addClass("display_none");
        $("#txt_StatusFlag" + cnt).val("");
        $("#txtRoleId" + cnt).val(AllGetStokItemInfo[cnt].RoleId);
        $("#txtDescA" + cnt).prop("value", AllGetStokItemInfo[cnt].RoleId);
        $('#CheckISActive' + cnt).prop('checked', 'checked');
        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });
    }
    function AddNewRow() {
        debugger;
        //if (!SysSession.CurrentPrivileges.AddNew) return;
        var CanAdd = true;
        if (CountGrid > 0) {
            for (var i = 0; i <= CountGrid; i++) {
                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    break;
                }
            }
        }
        if (CanAdd) {
            BuildControls(CountGrid);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode         
            $("#txtDescA" + CountGrid).removeAttr("disabled");
            $("#CheckISActive" + CountGrid).removeAttr("disabled");
            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");
            CountGrid += 1;
        }
    }
    function DeleteRow(RecNo) {
        if (!SysSession.CurrentPrivileges.Remove)
            return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", function () {
            //////debugger;
            var chack;
            $("#ddlfamilly_Cat" + RecNo).val("1");
            $("#ddlFamily" + RecNo).val("1");
            $("#ddlItem" + RecNo).val("2");
            $("#txtQuantity" + RecNo).val("1");
            $("#txtPrice" + RecNo).val("1");
            $("#txtQuantityRetrun" + RecNo).val("0");
            $("#txtAddons" + RecNo).val("0");
            $("#txtTotAddons" + RecNo).val("0");
            $("#txtTax" + RecNo).val("0");
            $("#No_Row" + RecNo).attr("hidden", "true");
            $("#txtCode" + RecNo).val("000");
        });
    }
    function Give_assignments_onClick() {
        for (var i = 0; i < CountGrid + 1; i++) {
            if ($("#txt_StatusFlag" + i).val() != 'i') {
                $("#txt_StatusFlag" + i).val('u');
            }
            $('#CheckISActive' + i).prop('checked', 'checked');
        }
    }
    function Block_permissions_onClick() {
        for (var i = 0; i < CountGrid + 1; i++) {
            if ($("#txt_StatusFlag" + i).val() != 'i') {
                $("#txt_StatusFlag" + i).val('u');
            }
            $('#CheckISActive' + i).removeProp('checked');
        }
    }
    function btnLoadRoles_onClick() {
        //$('#div_Data').html("");
        btnLoadRoles.disabled = true;
        debugger;
        var Q = 0;
        var le = Number(List_RoleDetails.length + List_Roles.length);
        for (var i = List_Roles.length; i < le; i++) {
            if ($("#txtUSER_NAME").val() == "" || txtUSER_CODE.value == "" || $("#txtUSER_PASSWORD").val() == "") {
                WorningMessageDailog("من فضلك تاكد من ادخال جميع البيانات", "");
            }
            else {
                var xx = List_Roles.filter(function (x) { return x.RoleId == List_RoleDetails[Q].RoleId; });
                if (xx.length > 0) {
                    Q += 1;
                    continue;
                }
                BuildControls(i);
                $("#txt_StatusFlag" + i).val("i"); //In Insert mode         
                $("#txtDescA" + i).prop('value', List_RoleDetails[Q].RoleId);
                //$("#txtDescA" + i).removeAttr("disabled");
                $("#CheckISActive" + i).removeAttr("disabled");
                //$("#btn_minus" + i).removeClass("display_none");
                //$("#txtRoleId" + i).val(List_RoleDetails[Q].RoleId);
                //$("#txtRemarks" + i).val(List_RoleDetails[Q].Remarks);
                //$("#CheckISActive" + i).removeAttr("disabled");
                //$("#txt_StatusFlag" + i).val("i");
                //$("#drpRoles").addClass("display_none");
                //$("#txtRoleRemarks").addClass("display_none");
                //$("#Ch_RoleActive").addClass("display_none");
                List_Singl_Roles.RoleId = List_RoleDetails[Q].RoleId;
                List_Singl_Roles.USER_CODE = txtUSER_CODE.value;
                List_Roles.push(List_Singl_Roles);
                Q += 1;
            }
        }
        CountGrid = Number(List_RoleDetails.length + List_Roles.length);
    }
    function Validation_Grid(rowcount) {
        //else
        debugger;
        if ($("#ddlfamilly_Cat" + rowcount).val() == "Null" && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {
            MessageBox.Show(" برجاء أختيار نوع الفئة", "خطأ");
            return false;
        }
        else if ($("#Family" + rowcount).val() == "" && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {
            MessageBox.Show(" برجاءادخال الفئة", "خطأ");
            return false;
        }
        else if (($("#Items" + rowcount).val() == "" || $("#ddlItem" + rowcount).val() == "الصنف") && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {
            MessageBox.Show(" برجاءادخال الصنف", "خطأ");
            return false;
        }
        else if (($("#txtQuantity" + rowcount).val() == "" || $("#txtQuantity" + rowcount).val() <= 0) && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {
            MessageBox.Show(" برجاءادخال الكمية", "خطأ");
            return false;
        }
        else if (($("#txtPrice" + rowcount).val() == "" || $("#txtPrice" + rowcount).val() == "0.00" || $("#txtPrice" + rowcount).val() == 0) && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {
            MessageBox.Show("  برجاءادخال السعر الشراء", "خطأ");
            return false;
        }
        else if (($("#Sales_Price" + rowcount).val() == "" || $("#Sales_Price" + rowcount).val() == 0) && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {
            MessageBox.Show("  برجاءادخال السعر البيع ", "خطأ");
            return false;
        }
        else if (($("#MinUnitPrice" + rowcount).val() == "" || $("#MinUnitPrice" + rowcount).val() == 0) && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {
            MessageBox.Show(" برجاءادخال السعر اقل سعر بيع", "خطأ");
            return false;
        }
        return true;
    }
    function Assign() {
        debugger;
        Model = new G_USERS();
        if (IsNew == true) {
            DocumentActions.AssignToModel(Model); //Insert Update
            if (chk_IsActive.checked) {
                Model.USER_ACTIVE = true;
            }
            else {
                Model.USER_ACTIVE = false;
            }
            Model.CompCode = 1;
            Model.Tokenid = 'HGFD-EV+xyuNsKkkH9SJrgL6XgROioRT8GfXE48AZcSVHN+256IG5apvYig==';
        }
        else {
            DocumentActions.AssignToModel(Model); //Insert Update
            if (chk_IsActive.checked) {
                Model.USER_ACTIVE = true;
            }
            else {
                Model.USER_ACTIVE = false;
            }
            Model.USER_CODE = Selecteditem[0].USER_CODE;
            Model.CompCode = 1;
            Model.Tokenid = 'HGFD-EV+xyuNsKkkH9SJrgL6XgROioRT8GfXE48AZcSVHN+256IG5apvYig==';
        }
        CustomG_USERS_Model.G_USERS = Model;
    }
    function Assign_Grid() {
        debugger;
        OperationModel_dital = new Array();
        for (var i = 0; i <= CountGrid + 1; i++) {
            OperationSingleModel = new G_RoleUsers();
            StatusFlag = $("#txt_StatusFlag" + i).val();
            //if (StatusFlag == "i") {
            //}
            //if (StatusFlag == "u") {
            //    OperationSingleModel.StatusFlag = StatusFlag.toString();
            //    OperationSingleModel.RoleId = $('#txtDescA' + i).val();
            //    OperationSingleModel.USER_CODE = $('#txtUSER_CODE').val();
            //    OperationSingleModel.ISActive = $('#CheckISActive' + i).prop('checked'); 
            //    OperationModel_dital.push(OperationSingleModel);
            //}
            //if (StatusFlag == "d") {
            //    OperationSingleModel.StatusFlag = StatusFlag.toString();
            //    OperationSingleModel.RoleId = $('#txtDescA' + i).val();
            //    OperationSingleModel.USER_CODE = $('#txtUSER_CODE').val();
            //    OperationSingleModel.ISActive = $('#CheckISActive' + i).prop('checked');
            //    OperationModel_dital.push(OperationSingleModel);
            //}
            if ($('#txtDescA' + i).val() != null) {
                OperationSingleModel.StatusFlag = StatusFlag.toString();
                OperationSingleModel.RoleId = $('#txtDescA' + i).val();
                OperationSingleModel.USER_CODE = $('#txtUSER_CODE').val();
                OperationSingleModel.ISActive = $('#CheckISActive' + i).prop('checked');
                OperationModel_dital.push(OperationSingleModel);
            }
        }
        debugger;
        OperationModel_dital = OperationModel_dital.filter(function (x) { return x.ISActive == true; });
        CustomG_USERS_Model.G_RoleUsers = OperationModel_dital;
    }
    function Insert() {
        CustomG_USERS_Model = new CustomG_USERS();
        Assign();
        Assign_Grid();
        debugger;
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("G_USERS", "Insert_USER"),
            data: JSON.stringify(CustomG_USERS_Model),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    MessageBox.Show("تم الحفظ بنجاح", "Success");
                    Update_claenData = 0;
                    FillddlUserMaster();
                    Display_All();
                    Valid = 2;
                    btnback_onclick();
                }
                else {
                    MessageBox.Show("خطأء", "Error");
                }
            }
        });
    }
    function Update() {
        CustomG_USERS_Model = new CustomG_USERS();
        Assign();
        Assign_Grid();
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("G_USERS", "Update_USER"),
            data: JSON.stringify(CustomG_USERS_Model),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    MessageBox.Show("تم التعديل بنجاح", "Success");
                    Update_claenData = 1;
                    FillddlUserMaster();
                    Display_All();
                    btnback_onclick();
                    $("#Div_control").attr("style", " margin-bottom: 19px;margin-top: 20px;");
                    Valid = 2;
                }
                else {
                    MessageBox.Show("خطأء", "Error");
                }
            }
        });
    }
    function Delete() {
        var USERS = $('#txtUSER_CODE').val();
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_USERS", "Delete_USER"),
            data: { USERS: USERS },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    //MessageBox.Show("تم الحذف", "Success");
                    alert("تم الحذف");
                    Update_claenData = 1;
                    FillddlUserMaster();
                    Display_All();
                    $("#Div_control").attr("style", " margin-bottom: 19px;margin-top: 20px;display: none;");
                    $("#id_div_Add").attr("disabled", "");
                    $("#id_div_Add").removeClass("disabledDiv");
                    Valid = 2;
                }
            }
        });
    }
})(USERS || (USERS = {}));
//# sourceMappingURL=USERS.js.map