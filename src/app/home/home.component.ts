import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import "datatables.net";
import { Direction } from 'angular-bootstrap-md/lib/free/carousel/carousel.component';


var json_data: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  term : any;
  userData : any;
  sector_id : any;
  sectors: any;
  username : any;

  dtOptions: any = {};
  i = 1;

  name: string;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = [];
  currentPage : any;

  constructor(private route: Router) { }

  ngOnInit(): void {

    sessionStorage.setItem('previousPage','home');
    //this.menu = this.menuService.getMenu();
    //this.listenRouting();

    this.username = sessionStorage.getItem("username")
    $(function () {
      var table = $("#myTable").DataTable({

        lengthMenu: [5, 10, 15, 25, 50, 100],
        pageLength: 10,
        //scrollY: "35vh",
        //autoWidth : false,
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
            className : "dt-center",
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
          url: environment.URL_sectorwise_details,
          type: 'POST',
          dataType: 'json',
          data: {
            ApiKey : environment.ApiKey,
            UserId : sessionStorage.getItem("UserId"),
            UserRoleId : sessionStorage.getItem("UserroleId"),
          },
          dataSrc: "SectorwiseAssessorCertificationStatusCountData.CertificationStatusData",

          beforeSend: function(){
            $('#image').show();
          },
          complete: function(){
            $('#image').hide();
          },
        },

        columns: [
          {data: "SectorId",
        },

          { data: "SectorName" ,
            render: function (data: any, type: any, row: any, meta: any) {
                var a =
                '<a style="color: blue" _ngcontent-kci-c162="" ng-reflect-router-link="/QualificationPackCandidateDetails" href="/QualificationPackCandidateDetails">' +
                row.SectorName +
                `</button>`;
              return a;
          },
          },


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
          json_data.SectorwiseAssessorCertificationStatusCountData.CertificationStatusData[
            index1
          ].SectorId
        );
        sessionStorage.setItem('QPID', '0')
        if(index2 == 2){
          sessionStorage.setItem('SearchType', 'GLC')
        }
        if(index2 == 3){
          sessionStorage.setItem('SearchType', 'GAC')
        }
        if(index2 == 4){
          sessionStorage.setItem('SearchType', 'GCC')
        }
        if(index2 == 5){
          sessionStorage.setItem('SearchType', 'GEC')
        }
        if(index2 == 6){
          sessionStorage.setItem('SearchType', 'GTC')
        }
        if(index2 == 7){
          sessionStorage.setItem('SearchType', 'GDTC')
        }
        if(index2 == 8){
          sessionStorage.setItem('SearchType', 'ILC')
        }
        if(index2 == 9){
          sessionStorage.setItem('SearchType', 'IAC')
        }
        if(index2 == 10){
          sessionStorage.setItem('SearchType', 'ICC')
        }
        if(index2 == 11){
          sessionStorage.setItem('SearchType', 'ITC')
        }
        if(index2 == 12){
          sessionStorage.setItem('SearchType', 'IDTC')
        }
        if(index2 == 13){
          sessionStorage.setItem('SearchType', 'TC')
        }
        if(index2 == 14){
          sessionStorage.setItem('SearchType', 'DTC')
        }
      });

    });
    
  }


  /*listenRouting() {
    let routerUrl: string, routerList: Array<any>, target: any;
    this.route.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        target = this.menu;
        this.breadcrumbList.length = 0;
        routerList = routerUrl.slice(1).split('/');
        routerList.forEach((router, index) => {
          
          target = target.find(page => page.path.slice(2) === router);
          
          this.breadcrumbList.push({
            name: target.name,
           
            path: (index === 0) ? target.path : `${this.breadcrumbList[index-1].path}/${target.path.slice(2)}`
          });
          
          if (index+1 !== routerList.length) {
            target = target.children;
          }
        });

        console.log(this.breadcrumbList);
      }
    });
  }*/




}
