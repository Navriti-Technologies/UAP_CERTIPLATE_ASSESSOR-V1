import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import "datatables.net";



var json_data: any;
@Component({
  selector: 'app-assessor-dashboard',
  templateUrl: './assessor-dashboard.component.html',
  styleUrls: ['./assessor-dashboard.component.css']
})
export class AssessorDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $(function () {
      var table = $("#myTable").DataTable({
        lengthMenu: [5, 10, 15, 25, 50, 100],
        pageLength: 10,
        //scrollY: "35vh",
        serverSide: false,
        scrollX: true,
        scrollCollapse: true,
        responsive: true,
        order: [1, "asc"],
        initComplete: function (settings, json) {
          json_data = json;
        },
        columnDefs: [

          {
            targets: 0,
            className : "index",
            createdCell : function(td, cellData, rowData, row, col){
              $(td).css('color', 'black')
            }
        },

          {
            targets: ["_all"],
            className: "dt-center",
            render: function(data,type,row){
              var color = 'black';
              return '<span style="color:' + color + '">' + data + '</span>';
            }
          },
        ],
        ajax: {
          url: environment.URL_AssessorDashBoard,
          type: 'POST',
          dataType: 'json',
          data: {
            ApiKey : environment.ApiKey,
            AssessorId : sessionStorage.getItem("UserId"),
          },
          dataSrc: "AssessorDashboardData.DashboardData",
          beforeSend: function(){
            $('#image').show();
          },
          complete: function(){
            $('#image').hide();
          },
        },

        columns: [
          { data: "SectorId" },
          { data: "SectorName"},
          { data: "QualificationPackCode",},
          { data: "QualificationPackName",},

          { data: "AllocatedCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.AllocatedCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorAssessmentData" href="/AssessorAssessmentData">' +
                row.AllocatedCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },


          { data: "AssessedCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.AssessedCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorAssessmentData" href="/AssessorAssessmentData">' +
                row.AssessedCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },


          { data: "AbsentCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.AbsentCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorAssessmentData" href="/AssessorAssessmentData">' +
                row.AbsentCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },


          { data: "DropOutCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.DropOutCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorAssessmentData" href="/AssessorAssessmentData">' +
                row.DropOutCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },

        ]
      });

      table.on( 'order.dt search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

      $("#myTable").on("click", "tbody tr td", function () {
        var index1 = table.row(this).index();
        var index2 = table.column(this).index();
        if(index2 == 4){
          sessionStorage.setItem('QPID', json_data.AssessorDashboardData.DashboardData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'ALLOCATED')
        }
        if(index2 == 5){
          sessionStorage.setItem('QPID', json_data.AssessorDashboardData.DashboardData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'ASSESSED')
        }
        if(index2 == 6){
          sessionStorage.setItem('QPID', json_data.AssessorDashboardData.DashboardData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'ABSENT')
        }
        if(index2 == 7){
          sessionStorage.setItem('QPID', json_data.AssessorDashboardData.DashboardData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'DROP_OUT')
        }
        

      });

    });
    
  }
}
