$(document).ready(function () {
    //debugger;
    TEAMWORK.InitalizeComponent();
});
var TEAMWORK;
(function (TEAMWORK) {
    var Details = new Array();
    var Model = new Table_Tim_work();
    var ReportGrid = new JsGrid();
    var sys = new SystemTools();
    var btnAdd;
    var txt_NAME;
    function InitalizeComponent() {
        InitalizeControls();
        InitalizeEvents();
    }
    TEAMWORK.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //debugger;
        btnAdd = document.getElementById("btnAdd");
        txt_NAME = document.getElementById("txt_NAME");
        ////textBoxes
    }
    function InitalizeEvents() {
        debugger;
        btnAdd.onclick = btnAdd_onclick;
    }
    function btnAdd_onclick() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("teamwork", "PROC_Enter_Tim_work"),
            data: { Name: 'Eslam', Cheak: false },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    debugger;
                    Details = result.Response;
                    InitializeGrid();
                    ReportGrid.DataSource = Details;
                    ReportGrid.Bind();
                }
            }
        });
    }
    function InitializeGrid() {
        debugger;
        $("#id_ReportGrid").attr("style", "");
        ReportGrid.OnRowDoubleClicked = DriverDoubleClick;
        ReportGrid.ElementName = "ReportGrid";
        ReportGrid.PrimaryKey = "ID";
        ReportGrid.Paging = true;
        ReportGrid.PageSize = 4;
        ReportGrid.Sorting = true;
        ReportGrid.Editing = true;
        ReportGrid.Inserting = false;
        ReportGrid.SelectedIndex = 1;
        ReportGrid.OnItemEditing = function () { };
        ReportGrid.Columns = [
            { title: "ID", name: "ID", type: "text", width: "100px", visible: false },
            { title: "الاسم", name: "Name", type: "text", width: "80px" },
            { title: "الحاله", name: "Cheak", type: "text", width: "60px" },
        ];
    }
    function DriverDoubleClick() {
        debugger;
        alert('Eslam');
        //Selecteditem = Details.filter(x => x.ID == Number(ReportGrid.SelectedKey));
        //modal.style.display = "block";
        //var title = "رقم الزبون ( " + Selecteditem[0].Num + " )";
        //var Labol = Selecteditem[0].Name;
        //var img = "";
        //var id_title = document.getElementById('id_title');
        //var id_Labol = document.getElementById('id_Labol');
        //id_title.innerHTML = title;
        //id_Labol.innerHTML = Labol;
    }
})(TEAMWORK || (TEAMWORK = {}));
//# sourceMappingURL=TEAMWORK.js.map