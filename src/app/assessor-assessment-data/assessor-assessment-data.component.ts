import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { environment } from 'src/environments/environment';
import "datatables.net";


var json_data: any;
var varAssessmentVideoData:any;
var rowData:any;
@Component({
  selector: 'app-assessor-assessment-data',
  templateUrl: './assessor-assessment-data.component.html',
  styleUrls: ['./assessor-assessment-data.component.css']
})
export class AssessorAssessmentDataComponent implements OnInit {
  userData : any;
  varAssessmentImageData :any;
 varImageIndex = 0;
 varImageUrl : any;
 varImageType = 0;
 varGoogleMapUrlFormat = 'https://www.google.com/maps/search/?api=1&query=[LAT],[LONG]';

 varVideoUrl = '';
 
 varVideoIndex = 0;

  constructor(private route: Router) { }

  ngOnInit(): void {

    $.ajax({
      url: environment.URL_AssessorDashboardCandidateData,
      type: 'POST',
      dataType: 'json',
      data: {
        ApiKey : environment.ApiKey,
        AssessorId : sessionStorage.getItem('UserId'),
        QualificationPackId : sessionStorage.getItem('QPID'),
        SearchType : sessionStorage.getItem('SearchType')
      },
      beforeSend: function(){
        $('#image').show();
      },
      complete: function(){
        $('#image').hide();
      },

      success: (data) => {
        var json = JSON.parse(JSON.stringify(data));
        this.userData = json.AssessorDashboardCandidateData.CandidateData
        rowData = json.AssessorDashboardCandidateData.CandidateData
      }
    });
  }


  getRowData(){
    $('#myTable').find('tr').on('click', function(){
      var index1 = $(this).index();
      sessionStorage.setItem('RequestId', rowData[index1].RequestId)
      sessionStorage.setItem('CandidateId', rowData[index1].CandidateId)
      });
  }
 
}


