$(document).ready(() => {
    //debugger;
    TEAMWORK.InitalizeComponent();


})

namespace TEAMWORK {

    var Details: Array<Table_Tim_work> = new Array<Table_Tim_work>();

    var Model: Table_Tim_work = new Table_Tim_work();

    var ReportGrid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();

    var btnAdd: HTMLButtonElement;
    var txt_NAME: HTMLInputElement;

    export function InitalizeComponent() {


        InitalizeControls();
        InitalizeEvents();




    }


    function InitalizeControls() {
        //debugger;

        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
        txt_NAME = document.getElementById("txt_NAME") as HTMLInputElement;


        ////textBoxes


    }

    function InitalizeEvents() {
        debugger


        btnAdd.onclick = btnAdd_onclick ;
     



    }


    function btnAdd_onclick() {

        debugger;
     

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("teamwork", "PROC_Enter_Tim_work"),
            data: { Name: 'Eslam', Cheak: false },
            success: (d) => {
                debugger;
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    debugger;
                    Details = result.Response as Array<Table_Tim_work>;

                 
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
        ReportGrid.OnItemEditing = () => { };
        ReportGrid.Columns = [
            { title: "ID", name: "ID", type: "text", width: "100px", visible: false },
            { title: "الاسم", name: "Name", type: "text", width: "80px" },
            { title: "الحاله", name: "Cheak", type: "text", width: "60px" },
            
        ];

    }



    function DriverDoubleClick() {

        debugger
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


}






