import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { environment } from 'src/environments/environment';

var varGradeData: any;

@Component({
  selector: 'app-candidate-grades',
  templateUrl: './candidate-grades.component.html',
  styleUrls: ['./candidate-grades.component.css']
})
export class CandidateGradesComponent implements OnInit {

  userData:any;
  AssessmentData:any;
  Nosdata:any;

  constructor(private route: Router) { }

  ngOnInit(): void {
    $.ajax({
      url: environment.URL_GetPCWiseGrade,
      type: 'POST',
      dataType: 'json',
      data: {
        ApiKey : environment.ApiKey,
        RequestId : sessionStorage.getItem('RequestId'),
        CandidateId : sessionStorage.getItem('CandidateId'),
        AssessmentCategoryId : 0,
        NosId : 0,
      },
      beforeSend: function(){
        $('#image').show();
      },
      complete: function(){
        $('#image').hide();
      },

      success: (data) => {
        $("#tblBody").empty();
        var json = JSON.parse(JSON.stringify(data));
        /*this.userData = json.PCwiseGradeData.Candidates
        for(var i=0;i<this.userData.length;i++){
          this.AssessmentData = this.userData[i].Assessments
          for(var j=0;j<this.AssessmentData.length;j++){
            this.Nosdata = this.AssessmentData[j].NosList
          }
        }*/

        varGradeData = data.PCwiseGradeData;
        if (varGradeData.Candidates  != null){
          var varTableBodyHtml = '', varRowSpan = '', varRowCounter = 0, varLabelRowCounter = 0;
          for (var i = 0; i < varGradeData.Candidates.length; i++){
            for (var j = 0; j < varGradeData.Candidates[i].Assessments.length; j++){
              varRowCounter++;
              if (varGradeData.Candidates[i].Assessments[j].NosList != null){
                varRowSpan = 'rowspan="' + varGradeData.Candidates[i].Assessments[j].NosList.length + '"';
                for (var k = 0; k < varGradeData.Candidates[i].Assessments[j].NosList.length; k++){

                  varLabelRowCounter++;
                  varTableBodyHtml += '<tr>';
                  if (k == 0)
                  {
                  varTableBodyHtml += '<td style="border-bottom: 2px black; text-align:center;"' + varRowSpan + '>' + varRowCounter + '</td>';
                  varTableBodyHtml += '<td style=" text-align:center;" ' + varRowSpan + '>' + varGradeData.Candidates[i].Assessments[j].AssessmentCategory + '</td>';
                  }

                  varTableBodyHtml += '<td style=" vertical-align:top;" >' + '<a style="color:blue; text-decoration:none;">'+varGradeData.Candidates[i].Assessments[j].NosList[k].NosName +'</a>'+ '</td>';
                  varTableBodyHtml += '<td style=" vertical-align:top;" >' + varGradeData.Candidates[i].Assessments[j].NosList[k].NosCode + '</td>';
                  varTableBodyHtml += '<td style=" vertical-align:top;" >' + varGradeData.Candidates[i].Assessments[j].NosList[k].NosMaximumMarks + '</td>';
                  varTableBodyHtml += '<td style=" vertical-align:top;" >' + varGradeData.Candidates[i].Assessments[j].NosList[k].NosObtainedMarks + '</td>';



                }
              }
            }
          }

          $("#tblBody").html(varTableBodyHtml);
        }


        
      }
    });
  }

}
