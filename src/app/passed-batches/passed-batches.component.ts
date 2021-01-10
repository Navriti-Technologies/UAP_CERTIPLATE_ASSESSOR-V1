import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import "datatables.net";

var json_data: any;

@Component({
  selector: 'app-passed-batches',
  templateUrl: './passed-batches.component.html',
  styleUrls: ['./passed-batches.component.css']
})
export class PassedBatchesComponent implements OnInit {
  UserRole:any;

  constructor() { }

  ngOnInit(): void {
    this.UserRole=sessionStorage.getItem('UserroleId')
    let url1 = window.location.href.split('=');
    var requestType = url1[url1.length-1]
    sessionStorage.setItem("reqType",requestType)



    $(function () {

      var table = $("#myTable").DataTable({
        lengthMenu: [5, 10, 15, 25, 50, 100],
        pageLength: 10,
        destroy: true,
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
          url: environment.URL_assessor_assessment_data,
          type: 'POST',
          dataType: 'json',
          data: {
            ApiKey : environment.ApiKey,
            //SectorId : sessionStorage.getItem('SectorId'),
            UserId : sessionStorage.getItem("UserId"),
            UserRoleId : sessionStorage.getItem("UserroleId"),
            RequestType : requestType
          },

          dataSrc: "AssessorAssessmentData.AssessorAssessmentData",
          beforeSend: function(){
            $('#image').show();
          },
          complete: function(){
            $('#image').hide();
          },

        },

        columns: [
          {data : "SdmsBatchId"},
          {data : "RequestId"},
          {data : "SdmsBatchId"},
          {data : "BatchSize",
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
            '<a class="btn btn-success" style="color: white;" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessmentEvaluationCandidateList" href="/AssessmentEvaluationCandidateList">' +
            row.BatchSize +
            `</button>`;
          return a;
      },
        },
          {data : "StageName"},
          {data : "StatusName"},

          {data : "TheoryAssessmentMode"},
          {data : "PracticalAssessmentMode"},
          {data : "VivaMcqAssessmentMode"},



          {data : "TheoryAssessedCount"},
          {data : "PracticalAssessedCount"},
          {data : "VivaMcqAssessedCount"},


          {data : "RequestorName"},
          {data : "CenterName"},
          {data : "TrainingPartnerName"},
          {data : "AssessorName"},
          {data : "ScheduledDate"},
          {data : "AssessmentDate"},
        ]

      });

      $("#myTable").on("click", "tbody tr td", function () {
        var index1 = table.row(this).index();
        var index2 = table.column(this).index();
        sessionStorage.setItem(
          "RequestId",
          json_data.AssessorAssessmentData.AssessorAssessmentData[
            index1
          ].RequestId
        );
        
      });


      table.on( 'order.dt search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    })

  }

}
