import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import "datatables.net";



var json_data: any;
@Component({
  selector: 'app-job-role',
  templateUrl: './job-role.component.html',
  styleUrls: ['./job-role.component.css']
})
export class JobRoleComponent implements OnInit {


  userData : any;
  username : any;
  previousPage : any;
  currentPage : any;

  constructor(private route: Router) { }

  ngOnInit() {

    this.username = sessionStorage.getItem("username")
    //this.currentPage = sessionStorage.setItem('currentPage','jobrole');
    this.previousPage = sessionStorage.setItem('previousPage','jobrole');

    //let url1 = window.location.href.split('=');
    //console.log(url1)
    //var SecId = url1[url1.length-1]
    //this.call_ajax(SecId)



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
          url: environment.URL_QPwise_details,
          type: 'POST',
          dataType: 'json',
          data: {
            ApiKey : environment.ApiKey,
            SectorId : sessionStorage.getItem('SectorId'),
            UserId : sessionStorage.getItem("UserId"),
            UserRoleId : sessionStorage.getItem("UserroleId")
          },
          dataSrc: "QPwiseAssessorCertificationStatusCountData.CertificationStatusData",
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

          { data: "GovernmentLeadCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.GovernmentLeadCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorCertificationDetails" href="/AssessorCertificationDetails">' +
                row.GovernmentLeadCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },


          { data: "GovernmentApprovedCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.GovernmentApprovedCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorCertificationDetails" href="/AssessorCertificationDetails">' +
                row.GovernmentApprovedCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },


          { data: "GovernmentCertifiedCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.GovernmentCertifiedCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorCertificationDetails" href="/AssessorCertificationDetails">' +
                row.GovernmentCertifiedCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },


          { data: "GovernmentExpiredCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.GovernmentExpiredCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorCertificationDetails" href="/AssessorCertificationDetails">' +
                row.GovernmentExpiredCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },


          { data: "GovernmentTotalCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.GovernmentTotalCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorCertificationDetails" href="/AssessorCertificationDetails">' +
                row.GovernmentTotalCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },


          { data: "GovernmentDistinctTotalCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.GovernmentDistinctTotalCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorCertificationDetails" href="/AssessorCertificationDetails">' +
                row.GovernmentDistinctTotalCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },

          { data: "InstitutionLeadCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.InstitutionLeadCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorCertificationDetails" href="/AssessorCertificationDetails">' +
                row.InstitutionLeadCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },


          { data: "InstitutionApprovedCount" ,
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.InstitutionApprovedCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorCertificationDetails" href="/AssessorCertificationDetails">' +
                row.InstitutionApprovedCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },


          { data: "InstitutionCertifiedCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.InstitutionCertifiedCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorCertificationDetails" href="/AssessorCertificationDetails">' +
                row.InstitutionCertifiedCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },


          { data: "InstitutionTotalCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.InstitutionTotalCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorCertificationDetails" href="/AssessorCertificationDetails">' +
                row.InstitutionTotalCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },


          { data: "InstitutionDistinctTotalCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.InstitutionDistinctTotalCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorCertificationDetails" href="/AssessorCertificationDetails">' +
                row.InstitutionDistinctTotalCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },

          { data: "TotalCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.TotalCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorCertificationDetails" href="/AssessorCertificationDetails">' +
                row.TotalCount +
                `</button>`;
              return a;
            } else {
              return '<span style="color:black">' + data + '</span>';
            }
          },
        },


          { data: "DistinctTotalCount",
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.DistinctTotalCount > 0) {
              var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/AssessorCertificationDetails" href="/AssessorCertificationDetails">' +
                row.DistinctTotalCount +
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
        sessionStorage.setItem(
          "SectorId",
          json_data.QPwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].SectorId
        );
        if(index2 == 5){
          sessionStorage.setItem('QPID', json_data.QPwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'GLC')
        }
        if(index2 == 6){
          sessionStorage.setItem('QPID', json_data.QPwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'GAC')
        }
        if(index2 == 7){
          sessionStorage.setItem('QPID', json_data.QPwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'GCC')
        }
        if(index2 == 8){
          sessionStorage.setItem('QPID', json_data.QPwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'GEC')
        }
        if(index2 == 9){
          sessionStorage.setItem('QPID', json_data.QPwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'GTC')
        }
        if(index2 == 10){
          sessionStorage.setItem('QPID', json_data.QPwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'GDTC')
        }
        if(index2 == 11){
          sessionStorage.setItem('QPID', json_data.QPwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'ILC')
        }
        if(index2 == 12){
          sessionStorage.setItem('QPID', json_data.QPwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'IAC')
        }
        if(index2 == 13){
          sessionStorage.setItem('QPID', json_data.QPwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'ICC')
        }
        if(index2 == 14){
          sessionStorage.setItem('QPID', json_data.QPwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'ITC')
        }
        if(index2 == 15){
          sessionStorage.setItem('QPID', json_data.QPwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'IDTC')
        }
        if(index2 == 16){
          sessionStorage.setItem('QPID', json_data.QPwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'TC')
        }
        if(index2 == 17){
          sessionStorage.setItem('QPID', json_data.QPwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].QualificationPackId)
          sessionStorage.setItem('SearchType', 'DTC')
        }

      });

    });
    
  }
  }

  /*call_ajax(SecId){
    $.ajax({
      url: environment.URL_QPwise_details,
      type: 'POST',
      dataType: 'json',
      data: {
        ApiKey : environment.ApiKey,
        SectorId : sessionStorage.getItem('SectorId'),
        UserId : sessionStorage.getItem("UserId"),
        UserRoleId : sessionStorage.getItem("UserroleId")
      }, 
      beforeSend: function(){
        $('#image').show();
      },
      complete: function(){
        $('#image').hide();
      },
      success: (data) => 
      {
        var json = JSON.parse(JSON.stringify(data));
        if (json.QPwiseAssessorCertificationStatusCountData.StatusId == "1"){
          this.userData = json.QPwiseAssessorCertificationStatusCountData.CertificationStatusData;
        }
      },
      error: function (err) {
        console.log('error:' + err);
      },
    });
  }

  

}*/
