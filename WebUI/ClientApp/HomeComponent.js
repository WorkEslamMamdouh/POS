$(document).ready(function () {
    //HomeComponent.Language();
    try {
        HomeComponent.InitalizeComponent();
    }
    catch (e) {
        window.open(Url.Action("LoginIndex", "Login"), "_self");
    }
});
var HomeComponent;
(function (HomeComponent) {
    //let res: any = GetResourceList("");
    var sys = new SystemTools();
    var But_Outlet;
    var But_Input;
    var btnCash;
    var Close;
    var btnDashboard;
    var btn_loguotuser;
    var sidebarCollapse;
    var SysSession = GetSystemSession();
    var systemEnv = SysSession.CurrentEnvironment;
    var Balance = 0;
    function OpenPage(moduleCode) {
        SysSession.CurrentEnvironment.ModuleCode = moduleCode;
        SysSession.CurrentEnvironment.ModuleCode = moduleCode;
        // //debugger;
        var compCode = SysSession.CurrentEnvironment.CompCode;
        var branchCode = SysSession.CurrentEnvironment.BranchCode;
        var UserCode = SysSession.CurrentEnvironment.UserCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        var Modulecode = SysSession.CurrentEnvironment.ModuleCode;
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetUserPrivilage"),
            data: { compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: 1, SubSystemCode: 1, Modulecode: Modulecode },
            success: function (d) {
                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    var result = JSON.parse(d);
                    if (result == null) {
                        MessageBox.Show("Access denied", moduleCode);
                        return;
                    }
                    if (result.Access == true) {
                        SysSession.CurrentPrivileges = result;
                        document.cookie = "Inv1_Privilage=" + JSON.stringify(result).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                        window.open(Url.Action(moduleCode + "Index", "Home"), "_self");
                    }
                    else {
                        MessageBox.Show("No Inv1_Privilage", moduleCode);
                    }
                }
            }
        });
    }
    HomeComponent.OpenPage = OpenPage;
    function OpenReportsPopup(moduleCode) {
        SysSession.CurrentEnvironment.ModuleCode = moduleCode;
        var compCode = SysSession.CurrentEnvironment.CompCode;
        var branchCode = SysSession.CurrentEnvironment.BranchCode;
        var UserCode = SysSession.CurrentEnvironment.UserCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        var Modulecode = SysSession.CurrentEnvironment.ModuleCode;
        Ajax.CallAsync({
            url: sys.apiUrl("SystemTools", "GetUserPrivilage"),
            data: { compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: 1, SubSystemCode: 1, Modulecode: Modulecode },
            success: function (d) {
                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    var result = JSON.parse(d);
                    if (result == null) {
                        MessageBox.Show("Access denied", "GeneralReports");
                        return;
                    }
                    if (result.Access == true) {
                        var opt = {
                            url: Url.Action(moduleCode, "GeneralReports"),
                            success: function (d) {
                                var result = d;
                                $("#PopupDialog").modal("show");
                                $("#PopupBody").html(result);
                                $('#PopupDialog').modal({
                                    refresh: true
                                });
                                var val = $("#rpTitle").text();
                                $("#TitleSpan").html(val);
                            }
                        };
                        Ajax.CallAsync(opt);
                    }
                    else {
                        MessageBox.Show("Access denied", "GeneralReports");
                    }
                }
            }
        });
    }
    HomeComponent.OpenReportsPopup = OpenReportsPopup;
    function InitalizeComponent() {
        Language();
        //GetBackgroundImage(); 
        // GetNotificationData();
        //Notifications_Message()
        // Apply user and company privilages 
        ApplyModules();
        ApplyCompanyPrivilages();
        $("#btnHelpRep").click(function () { ScreenHelp(); });
        InitializePages();
        $("#DashButton").css('pointer-events', 'auto');
        document.getElementById('Admin_name').innerHTML = SysSession.CurrentEnvironment.UserCode;
        if (SysSession.CurrentEnvironment.ScreenLanguage == 'ar') {
            $('#homeTitle').text("نظام سيف لادارة الاملاك");
        }
        else {
            $('#homeTitle').text("Safe Proprity Managment");
            $("#main-menu").removeClass("sm-rtl");
        }
        if (SysSession.CurrentEnvironment.ScreenLanguage == 'ar') {
            $('#LanguageButtonHome').text("Change Language");
        }
        else {
            $('#LanguageButtonHome').text(" تغير اللغة  ");
        }
        btn_loguotuser = DocumentActions.GetElementById("btn_loguotuser");
        btn_loguotuser.onclick = LogoutUserApi;
        btnCash = document.getElementById('btnCash');
        But_Input = document.getElementById('But_Input');
        But_Outlet = document.getElementById('But_Outlet');
        Close = document.getElementById('Close');
        sidebarCollapse = document.getElementById('sidebarCollapses');
        But_Input.onclick = Enter_Money;
        But_Outlet.onclick = Cash_Box;
        btnCash.onclick = Get_balance;
        Close.onclick = Close_Day;
        Check_Close_Day();
        sidebarCollapse.onclick = ON_Click_SidebarCollapse;
    }
    HomeComponent.InitalizeComponent = InitalizeComponent;
    function Get_balance() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Outletpirce", "Get_Balance"),
            success: function (d) {
                //debugger
                var result = d;
                if (result.IsSuccess == true) {
                    Balance = result.Response;
                    $('#Balance').html(' المبلغ (' + Balance + ')');
                }
                else {
                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });
    }
    function LogoutUserApi() {
        var userCode = SysSession.CurrentEnvironment.UserCode;
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("G_USERS", "LogoutUser"),
            data: { user: userCode },
            success: function (d) {
                // //debugger;
                if (d !== undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    SysSession = new SystemSession;
                    systemEnv = new SystemEnvironment;
                    deleteAllCookies();
                    document.cookie = "Inv1_systemProperties=" + new SystemEnvironment + "; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
                    document.cookie = "Inv1_Privilage=" + new UserPrivilege + "; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
                    SysSession.CurrentEnvironment.UserCode = "Ahmed";
                    return;
                }
            }
        });
    }
    HomeComponent.LogoutUserApi = LogoutUserApi;
    ;
    function ApplyCompanyPrivilages() {
        if (systemEnv.IsDashboardActive == false) {
            // disable dashboard button
            btnDashboard = DocumentActions.GetElementById("btnDashboard");
            btnDashboard.style.display = "none";
        }
    }
    function ON_Click_SidebarCollapse() {
        $('#cont').toggleClass('colapsdivcont');
        $('#sidebar').toggleClass('active');
    }
    function ApplyModules() {
        //debugger
        var lis = document.getElementsByClassName("liItem");
        var obj = [document.getElementById('liItem')];
        var modules = new Array();
        var compCode = SysSession.CurrentEnvironment.CompCode;
        var branchCode = SysSession.CurrentEnvironment.BranchCode;
        var UserCode = SysSession.CurrentEnvironment.UserCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetAllUserPrivilage"),
            async: false,
            data: { compCode: Number(compCode), branchCode: Number(branchCode), UserCode: UserCode, SystemCode: 1, SubSystemCode: 1 },
            success: function (d) {
                modules = d;
            }
        });
        // filter moulules where isavailable = false or access = false 
        var li;
        //debugger
        for (var i = 0; i < modules.length; i++) {
            //debugger
            var singleUserModule = modules[i];
            //Notification control
            if (singleUserModule.MODULE_CODE.substring(0, 5) == "Note_") {
                li = document.getElementById(singleUserModule.MODULE_CODE);
            }
            else if (singleUserModule.MODULE_CODE.substring(0, 4) == "tol_") {
                li = document.getElementById(singleUserModule.MODULE_CODE);
            }
            else {
                li = document.getElementById("btn" + singleUserModule.MODULE_CODE);
            }
            if (li != null) {
                if (singleUserModule != null) {
                    if (singleUserModule.Access === false)
                        li.style.display = "none";
                    if (singleUserModule.AVAILABLE === false)
                        li.style.display = "none";
                }
                else {
                    var key = li.getAttribute("key");
                    li.style.display = "";
                    li.className = "liItem";
                }
            }
            else {
                alert("wrong code  " + singleUserModule.MODULE_CODE);
            }
        }
        $('.MED').removeClass('display_none');
    }
    //By Muhammad Rajab 
    $("#LanguageButtonHome").click(function () {
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            RemoveStyleSheet("bootstrap-rtl");
            RemoveStyleSheet("mainAR");
            RemoveStyleSheet("Style_Arabic");
            RemoveStyleSheet("style");
            RemoveStyleSheet("StyleNewmassege");
            RemoveStyleSheet("responsive_AR");
            AppendStyleSheet("bootstrap.min");
            AppendStyleSheet("StyleEn");
            AppendStyleSheet("main");
            AppendStyleSheet("responsive");
            SysSession.CurrentEnvironment.ScreenLanguage = "en";
            $('#LanguageButtonHome').text(" تغير اللغة  ");
            document.cookie = "Inv1_systemProperties=" + JSON.stringify(SysSession.CurrentEnvironment) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
        }
        else {
            RemoveStyleSheet("StyleEn");
            RemoveStyleSheet("bootstrap.min");
            RemoveStyleSheet("main");
            RemoveStyleSheet("responsive");
            AppendStyleSheet("bootstrap-rtl");
            AppendStyleSheet("StyleNewmassege");
            AppendStyleSheet("mainAR");
            AppendStyleSheet("style");
            AppendStyleSheet("Style_Arabic");
            AppendStyleSheet("responsive_AR");
            SysSession.CurrentEnvironment.ScreenLanguage = "ar";
            $('#LanguageButtonHome').text("Change Language");
            document.cookie = "Inv1_systemProperties=" + JSON.stringify(SysSession.CurrentEnvironment) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
        }
        window.location.reload();
    });
    function GetNotificationData() {
        var comCode = SysSession.CurrentEnvironment.CompCode;
        var BraCode = SysSession.CurrentEnvironment.BranchCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetNotifications"),
            data: { comCode: comCode, BraCode: BraCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
            async: false,
            success: function (d) {
                var not = d;
                var ulcontent = "";
                $("#notificationUL").html("");
                var _loop_1 = function (n) {
                    var li = document.createElement("li");
                    var span = document.createElement("span");
                    var span2 = document.createElement("span");
                    if (n.NoteCount > 0) {
                        li.onclick = function () {
                            notification_onclick(n.MODULE_CODE, n.MODULE_CODE);
                        };
                    }
                    li.className = "liItem disabledLi dropdown cursor";
                    li.id = n.MODULE_CODE;
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        span.innerText = n.MODULE_DESCA;
                    }
                    else {
                        span.innerText = n.MODULE_DESCE;
                    }
                    span2.className = 'price';
                    span.className = 'bading_left';
                    span2.innerText = n.NoteCount.toString();
                    li.appendChild(span);
                    li.appendChild(span2);
                    $("#notificationUL").append(li);
                };
                for (var _i = 0, not_1 = not; _i < not_1.length; _i++) {
                    var n = not_1[_i];
                    _loop_1(n);
                }
            }
        });
    }
    function notification_onclick(ModuleCode, btnName) {
        var sys = new SystemTools();
        var condation = "CompCode = " + SysSession.CurrentEnvironment.CompCode;
        if ((ModuleCode == "Note_OPENINVOICE") || (ModuleCode == "Note_OPENTEMPINVOICE"))
            condation = condation + " and BranchCode = " + SysSession.CurrentEnvironment.BranchCode;
        sys.FindKey(ModuleCode, btnName, condation, function () { });
    }
    function UpdateNotificationAndSendMsg() {
        if (SysSession.CurrentEnvironment.IsNotificaitonActive == true) {
            var PeriodinSec = SysSession.CurrentEnvironment.I_Control.NotePeriodinSec;
            var comCode = SysSession.CurrentEnvironment.CompCode;
            var BraCode = SysSession.CurrentEnvironment.BranchCode;
            var SystemCode = SysSession.CurrentEnvironment.SystemCode;
            var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
            $.ajax({
                type: "GET",
                url: sys.apiUrl("SystemTools", "UpdateNotificationAndSndMsg"),
                data: { comCode: comCode, BraCode: BraCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
                success: function (d) {
                    GetNotificationData();
                    ApplyModules();
                    setTimeout(UpdateNotificationAndSendMsg, PeriodinSec * 1000);
                }
            });
        }
    }
    function HomePrev(controllerName, moduleCode) {
        var compCode = SysSession.CurrentEnvironment.CompCode;
        var branchCode = SysSession.CurrentEnvironment.BranchCode;
        var UserCode = SysSession.CurrentEnvironment.UserCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        var Modulecode = SysSession.CurrentEnvironment.ModuleCode;
        //debugger
        Ajax.Callsync({
            url: sys.apiUrl("SystemTools", "GetUserPrivilage"),
            data: { compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: 1, SubSystemCode: 1, Modulecode: moduleCode },
            success: function (d) {
                //debugger
                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    var result = JSON.parse(d);
                    if (result == null) {
                        MessageBox.Show("Access denied", controllerName);
                        return;
                    }
                    if (result.Access == true) {
                        $("#spnFav").css("display", "inline-block");
                        SysSession.CurrentPrivileges = result;
                        SysSession.CurrentPrivileges.MODULE_CODE = SysSession.CurrentEnvironment.ModuleCode;
                        document.cookie = "Inv1_Privilage=" + JSON.stringify(result).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                    }
                    else {
                        MessageBox.Show("Access denied", controllerName);
                    }
                }
            }
        });
    }
    HomeComponent.HomePrev = HomePrev;
    //function GetBackgroundImage() {
    //    $.ajax({
    //        type: "GET",
    //        async: false,
    //        url: sys.apiUrl("SystemTools", "getBackgroundImage"),
    //        data: { CompCode: Number(SysSession.CurrentEnvironment.CompCode) },
    //        success: (response) => {
    //            let class_css = "<style>.hero-image {background-image: url(../../images/Background/" + response + ")!important;height: -webkit-fill-available;background-position: center!important;background-repeat:repeat;background-size: cover;position: relative;}</style>";
    //            $("#cont").append(class_css);
    //            $("#body_img").addClass("hero-image");
    //            //$("#cont").html(' <img id="img_divcont" style="background-repeat: no-repeat;max-width: 104.9%;height: auto;margin: -15px -29px 0px -14px;" src="/images/Background/' + response + '" alt="Alternate Text" /> ');
    //        }
    //    });
    //}
    function OpenView(controllerName, moduleCode) {
        //debugger;
        SysSession.CurrentEnvironment.ModuleCode = moduleCode;
        var compCode = SysSession.CurrentEnvironment.CompCode;
        var branchCode = SysSession.CurrentEnvironment.BranchCode;
        var UserCode = SysSession.CurrentEnvironment.UserCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        var Modulecode = SysSession.CurrentEnvironment.ModuleCode;
        localStorage.setItem("Compcode1", compCode);
        Ajax.Callsync({
            url: sys.apiUrl("SystemTools", "GetUserPrivilage"),
            data: { compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: 1, SubSystemCode: 1, Modulecode: Modulecode },
            success: function (d) {
                //debugger;
                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    var result = JSON.parse(d);
                    if (result == null) {
                        MessageBox.Show("Access denied", controllerName);
                        return;
                    }
                    if (result.Access == true) {
                        $("#spnFav").css("display", "inline-block");
                        SysSession.CurrentPrivileges = result;
                        SysSession.CurrentPrivileges.MODULE_CODE = SysSession.CurrentEnvironment.ModuleCode;
                        sessionStorage.setItem("MODU_CODE", SysSession.CurrentEnvironment.ModuleCode);
                        systemEnv.ScreenLanguage = sessionStorage.getItem("temp_lang");
                        document.cookie = "Privilage=" + JSON.stringify(d).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                        window.open(Url.Action(controllerName + "Index", controllerName), "_self");
                    }
                    else {
                        MessageBox.Show("Access denied", controllerName);
                    }
                }
            }
        });
    }
    HomeComponent.OpenView = OpenView;
    function InitializePages() {
        //debugger;
        $("#btnHome").click(function () { OpenPage(Modules.Home); });
        $("#btnSlsTrSales").click(function () { OpenPage(Modules.SlsTrSales); });
        $("#btnSlsTrReturn").click(function () { OpenPage(Modules.SlsTrReturn); });
        $("#btnPurchases").click(function () { OpenPage(Modules.Purchases); });
        $("#btnCategories").click(function () { OpenPage(Modules.Categories); });
        $("#btnItems").click(function () { OpenPage(Modules.Items); });
        $("#btnSupplier").click(function () { OpenPage(Modules.Supplier); });
        $("#btnSalesinventory").click(function () { OpenPage(Modules.Salesinventory); });
        $("#btnfamilly_Cat").click(function () { OpenPage(Modules.familly_Cat); });
        $("#btnIncome_expenses").click(function () { OpenPage(Modules.Income_expenses); });
        $("#btnUSERS").click(function () { OpenPage(Modules.USERS); });
        //$("#btnDashboard").click(() => { GetView(Modules.Dashboard); })
    }
    function Notifications_Message() {
        var comCode = SysSession.CurrentEnvironment.CompCode;
        var BraCode = SysSession.CurrentEnvironment.BranchCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetNotifications_Message"),
            // data: { comCode: comCode, SystemCode: SystemCode },
            async: false,
            success: function (d) {
                var massg = d;
                var ulcontent = "";
                $("#creatnotesmassg").html("");
                for (var _i = 0, massg_1 = massg; _i < massg_1.length; _i++) {
                    var ms = massg_1[_i];
                    var li = document.createElement("li");
                    var span = document.createElement("span");
                    var span2 = document.createElement("span");
                    var span3 = document.createElement("span");
                    var span4 = document.createElement("span");
                    li.id = ms.AlertID.toString();
                    if (ms.NoteSubType == 1) {
                        li.className = "liItem disabledLi dropdown cursor border_li style_li1";
                    }
                    else {
                        li.className = "liItem disabledLi dropdown cursor border_li style_li2";
                    }
                    span.innerText = ms.MsgText;
                    span.className = 'bading_left font_mseeg';
                    span2.className = 'col-lg-12 font_mseeg';
                    span3.className = 'col-lg-12 font_mseeg';
                    span4.className = 'col-lg-12 font_mseeg';
                    span2.innerText = DateTimeFormat(ms.MsgDate);
                    li.appendChild(span);
                    li.appendChild(span2);
                    li.appendChild(span3);
                    li.appendChild(span4);
                    $("#creatnotesmassg").append(li);
                }
            }
        });
    }
    //By Muhammad Rajab
    function Language() {
        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
            RemoveStyleSheet("bootstrap-rtl");
            RemoveStyleSheet("responsive_AR");
            RemoveStylejs("mainAR");
            RemoveStyleSheet("Style_Arabic");
            RemoveStyleSheet("style");
            RemoveStyleSheet("StyleNewmassege");
            $("#bootstrap_rtl").remove();
            $("#Style_Arabic").remove();
            AppendStyleSheet("StyleEn");
            AppendStyleSheet("bootstrap.min");
            AppendStylejs("main");
            AppendStyleSheet("responsive");
            SysSession.CurrentEnvironment.ScreenLanguage = "en";
            $("#btn_loguotuser").text("Logout");
        }
        else {
            RemoveStyleSheet("StyleEn");
            RemoveStyleSheet("bootstrap.min");
            RemoveStylejs("main");
            RemoveStyleSheet("responsive");
            AppendStyleSheet("bootstrap-rtl");
            AppendStyleSheet("StyleNewmassege");
            AppendStylejs("mainAR");
            AppendStyleSheet("style");
            AppendStyleSheet("Style_Arabic");
            AppendStyleSheet("responsive_AR");
            //$('#langImg').attr('src', '../images/english.png');
            SysSession.CurrentEnvironment.ScreenLanguage = "ar";
            $("#btn_loguotuser").html('  الخروج من النظام <span class="adminpro-icon adminpro-locked author-log-ic"></span>');
        }
        //$("#SearchBox").draggable();
        App.Startup();
    }
    HomeComponent.Language = Language;
    function AppendStyleSheet(fileName) {
        var lnk = document.createElement('link');
        lnk.href = "../Style_design/" + fileName + ".css";
        lnk.rel = 'stylesheet';
        lnk.type = 'text/css';
        document.getElementsByTagName("head")[0].appendChild(lnk);
    }
    function RemoveStyleSheet(fileName) {
        var href = "../Style_design/" + fileName + ".css";
        $("link[rel=stylesheet][href~='" + href + "']").remove();
    }
    //By Muhammad Rajab 
    function AppendStylejs(fileName) {
        var script = document.createElement('script');
        script.src = "../Style_design/" + fileName + ".js";
        document.getElementById("caret_script").appendChild(script);
    }
    //By Muhammad Rajab 
    function RemoveStylejs(fileName) {
        var href = "../Style_design/" + fileName + ".js";
        $("<script src=" + href + " ></script>").remove();
    }
    function ScreenHelp() {
        var ModuleCode = SysSession.CurrentPrivileges.MODULE_CODE;
        //debugger
        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetHelp"),
            data: { ModuleCode: ModuleCode },
            async: false,
            success: function (d) {
                //debugger;
                var result = d;
                var res = result.Response;
                if (res != null) {
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        $("#modalHelpRep").html("<div style=\"direction:rtl\" >" + res.HelpBody_Ar + "</div>");
                    }
                    else {
                        $("#modalHelpRep").html("<div style=\"direction:ltr\" >" + res.HelpBody_En + "</div>");
                    }
                }
            }
        });
    }
    function Cash_Box() {
        if ($('#id_pirce').val() == '' || $('#id_Dasc_Name').val() == '') {
            MessageBox.Show("  خطأ  يجب ادخل المبلغ والوصف ", "خطأ");
            return;
        }
        var Dasc_Name = $('#id_Dasc_Name').val();
        var pirce = Number($('#id_pirce').val());
        var Tr_Type = 'مصروفات';
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Outletpirce", "Insert"),
            data: { Dasc_Name: Dasc_Name, pirce: pirce, UserName: SysSession.CurrentEnvironment.UserCode, Tr_Type: Tr_Type },
            success: function (d) {
                //debugger
                var result = d;
                if (result.IsSuccess == true) {
                    var Outlet = result.Response;
                    if (Outlet == pirce) {
                        MessageBox.Show("تم ", "الحفظ");
                        $('#id_Dasc_Name').val('');
                        $('#id_pirce').val('');
                        $('#Balance').html(' المبلغ (' + (Balance - pirce) + ')');
                    }
                    else {
                        MessageBox.Show(" خطأ لا يوجد مبلغ كافي  (" + Outlet + ")", "خطأ");
                        $('#id_Dasc_Name').val('');
                        $('#id_pirce').val('');
                    }
                }
                else {
                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });
    }
    function Enter_Money() {
        if ($('#id_pirce').val() == '' || $('#id_Dasc_Name').val() == '') {
            MessageBox.Show("  خطأ  يجب ادخل المبلغ والوصف ", "خطأ");
            return;
        }
        var Dasc_Name = $('#id_Dasc_Name').val();
        var pirce = Number($('#id_pirce').val());
        var Tr_Type = 'أيرادات';
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Outletpirce", "Insert_Enter_Money"),
            data: { Dasc_Name: Dasc_Name, pirce: pirce, UserName: SysSession.CurrentEnvironment.UserCode, Tr_Type: Tr_Type },
            success: function (d) {
                //debugger
                var result = d;
                if (result.IsSuccess == true) {
                    var Outlet = result.Response;
                    MessageBox.Show("تم ", "الحفظ");
                    $('#id_Dasc_Name').val('');
                    $('#id_pirce').val('');
                    $('#Balance').html(' المبلغ (' + (Balance - Outlet) + ')');
                }
                else {
                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });
    }
    function Close_Day() {
        //$('#Close').attr('style', 'margin-top: -18%;background-color: #4df109;');
        if ($('#Close').attr('style') != 'margin-top: -18%;background-color: #4df109;border-radius: 11px;') {
            ConfirmMessage("هل ترغب في قفل اليوم ", "code cannot br repeated?", "تحذير", "worning", function () {
                Ajax.Callsync({
                    type: "Post",
                    url: sys.apiUrl("Close_Day", "Close"),
                    success: function (d) {
                        //debugger
                        var result = d;
                        if (result.IsSuccess == true) {
                            $('#Close').attr('style', 'margin-top: -18%;background-color: #4df109;border-radius: 11px;');
                        }
                        else {
                            $('#Close').attr('style', 'margin-top: -18%;background-color: #c40303;border-radius: 11px;');
                        }
                    }
                });
                return false;
            });
        }
    }
    function Check_Close_Day() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Close_Day", "Check_Close_Day"),
            success: function (d) {
                //debugger
                var result = d;
                if (result.IsSuccess == true) {
                    var res = result.Response;
                    //alert(res);
                    if (res == '1900-01-01T00:00:00') {
                        $('#Data_Day').html("");
                        //Close.style.
                        $('#Close').attr('style', 'margin-top: -18%;background-color: #4df109;border-radius: 11px;');
                    }
                    else {
                        $('#Data_Day').html(formatDate(res));
                        $('#Close').attr('style', 'margin-top: -18%;background-color: #c40303;border-radius: 11px;');
                    }
                }
                else {
                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });
    }
})(HomeComponent || (HomeComponent = {}));
//# sourceMappingURL=HomeComponent.js.map