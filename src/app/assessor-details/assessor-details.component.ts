import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
//import * as Highcharts from 'highcharts'
import { Chart } from 'chart.js';


//import { BsModalService } from 'ngx-bootstrap/modal';
//import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ExcelService } from '../service/excel.service';
//import { ModalComponent } from '../modal/modal.component';
import "datatables.net";
import { TableModule } from 'angular-bootstrap-md';


var json_data: any;
@Component({
  selector: 'app-assessor-details',
  templateUrl: './assessor-details.component.html',
  styleUrls: ['./assessor-details.component.css']
})


export class AssessorDetailsComponent implements OnInit {

  //modalRef: BsModalRef;

  /*currentRate = 8;
  title = 'D3 Barchart with Angular 10';
  width: number;
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;*/

  chart = [];

  term : any;
  chartOptions = {};
  counter = 0;
  //Highcharts = Highcharts;
  statewiseData : any;
  assessorData : any;
  data:any;
  state_id:any;
  state_name:any;
  assessor_count:any;
  previousPage : any;


  page:number = 1;
  totalRecords:number=0;
  stateid = [];
  x_data =  [];
  y_data = [];
  color_array = ["#28B7BB", "#61AE48","#CB36D1","#F5BB00","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"];
  bgColor = [];
  chartdata = {};

  username : any;

  constructor(private route: Router, private excelService:ExcelService) {

   }
  ngOnInit(){


    this.previousPage = sessionStorage.getItem('previousPage');

    this.username = sessionStorage.getItem("username")

    /** Calling API to get assessor certification details */
    //let  url =  new URL(window.location.href)
    var SecId = sessionStorage.getItem('SectorId');
    var qp_Id = sessionStorage.getItem('QPID');
    var SearchType = sessionStorage.getItem('SearchType');
    this.call_statewise_ajax(SecId, qp_Id, SearchType)
  }


  call_statewise_ajax(SecId, qp_Id, SearchType){
    $.ajax({
      url: environment.URL_statewise_detail,
      type: 'POST',
      dataType: 'json',
      data: {
        ApiKey : environment.ApiKey,
        SectorId : SecId,
        QualificationPackId : qp_Id,
        SearchType : SearchType,
        UserId : sessionStorage.getItem('UserId'),
        UserRoleId : sessionStorage.getItem('UserroleId')
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
        let i = -1;
        if (json.StatewiseAssessorCountData.StatusId == "1"){
          this.statewiseData = json.StatewiseAssessorCountData.StatewiseAssessorData;
            for (var item in this.statewiseData){
              this.state_id = this.statewiseData[item].StateId
              this.state_name =  this.statewiseData[item].StateName

              this.assessor_count = this.statewiseData[item].AssessorCount
                this.stateid.push(this.state_id);
                //this.x_data.push(this.state_name + '(' + this.state_id + ')');
                this.x_data.push(this.state_name);
                this.y_data.push(this.assessor_count);
                i++;
                this.bgColor.push(this.color_array[i]);
            }
            console.log(this.stateid)
            console.log(this.x_data)
            console.log(this.y_data)
            setTimeout(() => {
              this.state_chart( this.stateid, this.x_data, this.y_data, this.bgColor)
          }, 500);
          //this.stateData = json.AssessorCertificationDetailedData.StatewiseAssessorData;
          //this.totalRecords = this.assessorData.length
        }
      },
      error: function (err) {
        console.log('error:' + err);
      },
    });
  }


  state_chart(sid,xlabel,ydata,bgcolors){
    const that = this;
    this.chart = new Chart('myChart',{
      type: 'bar',
      options: {

        layout: {
          padding: {
              left: 40,
              right: 40,
              top: 20,
              bottom: 20
          }
      },
        
        hover : {
          mode : 'index',
          events: ['mousemove'],
          onHover : (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
            event.target.style.colorr = chartElement[0] ? 'green' : '#45a049';
        }
        },
        onClick: function(e,i)  {
          e = i[0];
          //alert(sid[e._index]);
          var x_value = this.data.labels[e._index];
          sessionStorage.setItem("stateid",x_value)
          //sessionStorage.setItem("previousPage",'graph')


          //$('.toggle2').css('display','none');
          $('.second').css('display','block');
          $('.first').css('display','block').slideUp('slow')
          that.assessor_cert_detail(sid[e._index]);
          
      },
        legend: {
          
              display : false
          
      },
        scales: {
          yAxes: [{
            barThickness : 40,
            gridLines:{
              zeroLineColor:"white"
            },
            ticks: {
              beginAtZero: true,
              fontColor: 'white',
            }
          }],
          xAxes: [{
            gridLines:{
              zeroLineColor:"white"
            },
            ticks: {
              fontColor: 'white',
              font : 'bold'
            }
          }]
        },
        responsive: true,
        title: {
          display: true,
          text: 'Assessor availability(Statewise)', 
          fontColor: "white",
          fontSize: 18 ,
        },
      },
      data: {
        labels: xlabel,
        datasets: [
          {
            
            type: 'bar',
            label: 'Statewise Assessor Distribution',
            data: ydata,
            backgroundColor: bgcolors,
            borderColor: bgcolors,
            maxBarThickness : 60,
            fill: true,
          },
          
        ]
      }
    });
  }

  GetDynamicColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

  scrolldown(){
    $('.second').css('display','none');
    $('.first').show('slow')
  }

  openModal() {
    /*this.modalRef = this.modalService.show(ModalComponent ,  {
      initialState: {
        title: 'Assessor Certification Details',
        data: {}
      },
      class: 'modal-dialog-centered modal-lg',
    });*/

    $('.toggle1').css('display', 'block');
    $('.toggle2').css('display', 'none'); 
    


    //this.assessor_cert_detail();

  }
  

  assessor_cert_detail(varStateId){

    //let  url =  new URL(window.location.href)
    var SecId = sessionStorage.getItem('SectorId');
    var qp_Id = sessionStorage.getItem('QPID');
    var SearchType = sessionStorage.getItem('SearchType');

    $(function () {
      var table = $("#myTable").DataTable({
        destroy: true,
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
            className : "dt-center",
            createdCell : function(td, cellData, rowData, row, col){
              $(td).css('color', 'black')
            }
        },

        /*{
          targets: 14,
          className : "index",
          createdCell : function(td, cellData, rowData, row, col){
            $(td).css('color', 'black')
          }
      },*/

          {
            targets: ["_all"],
            className: "dt-center",
            render: function(data,type,row){
              var color = 'black';
              return '<span style="color:' + color + '">' + data + '</span>';
            }
          },
        ],


        ajax:{
          url: environment.URL_assessor_cert_details,
          type: 'POST',
          dataType: 'json',
          data: {
            ApiKey : environment.ApiKey,
            SectorId : SecId,
            QualificationPackId : qp_Id,
            StateId : varStateId,
            SearchType : SearchType,
            UserId : sessionStorage.getItem('UserId'),
            UserRoleId : sessionStorage.getItem('UserroleId')
          }, 
          dataSrc: "AssessorCertificationDetailedData.AssessorData",
          beforeSend: function(){
            $('#image').show();
          },
          complete: function(){
            $('#image').hide();
          },
        },

        columns: [
          {data : "AssessorId"},
          {data : "AssessorId"},
          {data : "AssessorName"},
          {data : "AssessorEmail"},
          {data : "AssessorPhone"},
          {data : "AssessorAlternatePhone"},

          {data : "AllocationType"},
          {data : "DateOfUpload"},
          {data : "District"},
          {data : "State"},
          {data : "AadhaarNumber"},

          {data : "PanCardNumber"},
          {data : "AssessorStatus"},
          {data : "Sector"},
          {data : "QualificationPacks"},
          {data : "SscCertificationIssuedBy"},


          {data : "SscCertificateFileName"},
          {data : "SscCertificationIssuedDate"},
          {data : "SscCertificationExpiryDate"},
          {data : "LanguagesKnown"},
          {data : "AssessorSource"},

          {data : "SourcedByUserName"},
          {data : "BankName"},
          {data : "BankAccountNumber"},
          {data : "IFSC"},
          {data : "ChequeFileName"},

          {data : "MouFileName"},
          {data : "AssessorImageFileName"},
          {data : "ResumeFileName"},
          {data : "EducationCertificateFileName"},
          {data : "ExperienceCertificateFileName"},
          
        ]
      });
      //$("div.toolbar").html('<a class="btn btn-success" style="background-color: black; border-color:black; margin-bottom:1%; float:right" (click)="download_file()" value="Download Excel"><mat-icon>get_app</mat-icon></a>');

      table.on( 'order.dt search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    });
    
    $.ajax({
      url: environment.URL_assessor_cert_details,
      type: 'POST',
      dataType: 'json',
      data: {
        ApiKey : environment.ApiKey,
        SectorId : SecId,
        QualificationPackId : qp_Id,
        StateId : varStateId,
        SearchType : SearchType,
        UserId : sessionStorage.getItem('UserId'),
        UserRoleId : sessionStorage.getItem('UserroleId')
      }, 
      success: (data) => 
      {
        var json = JSON.parse(JSON.stringify(data));
        if (json.AssessorCertificationDetailedData.StatusId == "1"){
          this.assessorData = json.AssessorCertificationDetailedData.AssessorData

          //this.stateData = json.AssessorCertificationDetailedData.StatewiseAssessorData;
          //this.totalRecords = this.assessorData.length
        }
      },
      error: function (err) {
        console.log('error:' + err);
      },
    });
  }


  

  on_key(){
    var input, filter,cell, table, th,tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("dt");
  tr = table.getElementsByTagName("tr");
  td = table.getElementsByTagName("td");
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = "none";

    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < td.length; j++) {
      cell = tr[i].getElementsByTagName("td")[j];
      if (cell) {
        if (cell.innerText.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        } 
      }
    }
}
}


download_file(){
  this.excelService.exportAsExcelFile(this.assessorData, 'assessor_data');

}


  /** Graphical details of the assessor based on geography */
  create_chart(chart_data){
    this.chartOptions = {
      chart: {
        height:'100%',  
        backgroundColor: 'transparent',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        style: {
          fontFamily: 'serif',
          fontColor : 'white',
          marginTop : 'auto'
      }
    },
    title: {
        text: 'Geographywise Assessor Details ',
        floating: true,
        style: {
          color : 'white',
      }
    },
    tooltip: {
        pointFormat: 'Number of Assessors : {point.y}'
    },
    plotOptions: {
        pie: {
          size:'70%',
          height: '70%',
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: 'white',
                }
            },
        }
    },
    series: [
      {
          data: chart_data
      }
    ]
  }

  }


  pageChanged(event){
    this.page = event;
  }

  toggle1(){
    $('.toggle1').hide();
    $('.toggle2').show(); 
  }
  toggle2(){
    $('.toggle2').css('display', 'none');
    $('.toggle1').css('display', 'block');
  }


  toggle(){
    window.location.reload();
  }
  



  


}
