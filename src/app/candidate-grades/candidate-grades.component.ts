import { Component, OnInit, SecurityContext } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

var varGradeData: any;
var varNosIdArray = [];
var AssessmentCategoryArray = [];

@Component({
  selector: 'app-candidate-grades',
  templateUrl: './candidate-grades.component.html',
  styleUrls: ['./candidate-grades.component.css']
})
export class CandidateGradesComponent implements OnInit {


  userData:any;
  AssessmentData:any;
  Nosdata:any;

  varAssessmentImageData :any;
 varImageIndex = 0;
 varImageUrl : any;
 varImageType = 0;
 
 varAssessmentId:any
 

  constructor(private route: Router, private sanitizer: DomSanitizer) {
    
   }

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

                  varTableBodyHtml += '<td style=" vertical-align:top;" ><a class="mylink" style="cursor:pointer;color:blue;">' +varGradeData.Candidates[i].Assessments[j].NosList[k].NosName +'</a></td>';
                  var varNosId = varGradeData.Candidates[i].Assessments[j].NosList[k].NosId
                  var varAssessmentCategory = varGradeData.Candidates[i].Assessments[j].AssessmentCategory
                  varNosIdArray.push([varNosId]);
                  AssessmentCategoryArray.push([varAssessmentCategory]);
                  varTableBodyHtml += '<td style=" vertical-align:top;" >' + varGradeData.Candidates[i].Assessments[j].NosList[k].NosCode + '</td>';
                  varTableBodyHtml += '<td style=" vertical-align:top;" >' + varGradeData.Candidates[i].Assessments[j].NosList[k].NosMaximumMarks + '</td>';
                  varTableBodyHtml += '<td style=" vertical-align:top;" >' + varGradeData.Candidates[i].Assessments[j].NosList[k].NosObtainedMarks + '</td>';
                  //console.log(this.varNosId, this.varAssessmentId);
                  //this.hello(this.varNosId)
                }
              }
            }
          }

          $("#tblBody").html(varTableBodyHtml);
          let children = document.getElementsByClassName("mylink");
          for (let i = 0; i < children.length; i++) {
          children[i].addEventListener("click", (event: Event) => {
              this.PC_popup(varNosIdArray[i], AssessmentCategoryArray[i])
          //this.PC_popup(this.varNosId, this.varAssessmentId);
          //console.log(varNosIdArray[i])
        });
      }
        
    }
        
      }
    });
  }

  PC_popup(varNosId, varAssessmentId)
        {
          var CategoryId
          if(varAssessmentId[0] == 'Theory'){
            CategoryId = 1
          }
          else if(varAssessmentId[0] == 'Practical'){
            CategoryId = 2
          }
          else if(varAssessmentId[0] == 'Viva/MCQ'){
            CategoryId = 3
          }

          //console.log(varAssessmentId[0],CategoryId)
            $.ajax({
                type: "POST",
                url: environment.URL_GetPCWiseGrade,
                async: false,
                data: {
                  ApiKey : environment.ApiKey,
                  RequestId : sessionStorage.getItem('RequestId'),
                  CandidateId : sessionStorage.getItem('CandidateId'),
                  AssessmentCategoryId : CategoryId,
                  NosId : varNosId[0],
                },
                //beforeSend: function (x) { if (x && x.overrideMimeType) { x.overrideMimeType("application/json;charset=UTF-8"); } },
                dataType: "jsonp",
                beforeSend: function(){
                  $('#image').show();
                },
                complete: function(){
                  $('#image').hide();
                },
                success: function (data)
                {
                  varGradeData = data.PCwiseGradeData;
                  if (varGradeData.Candidates  != null)
                  {
                    var varTableBodyHtml = '', varRowSpan = '', varRowCounter = 0, varLabelRowCounter = 0;
                    for (var i = 0; i < varGradeData.Candidates.length; i++){
                      for (var j = 0; j < varGradeData.Candidates[i].Assessments.length; j++){
                        for(var m=0;m<varGradeData.Candidates[i].Assessments[j].NosList.length; m++){
                          varRowCounter++;

                          if (varGradeData.Candidates[i].Assessments[j].NosList[m].PcList != null){
                            varRowSpan = 'rowspan="' + varGradeData.Candidates[i].Assessments[j].NosList[m].PcList.length + '"';
                            for (var k = 0; k < varGradeData.Candidates[i].Assessments[j].NosList[m].PcList.length; k++){
                              varLabelRowCounter++;
                              varTableBodyHtml += '<tr>';
                              if (k == 0)
                              {
                              varTableBodyHtml += '<td style="border-bottom: 2px black; text-align:center;"' + varRowSpan + '>' + varRowCounter + '</td>';
                              varTableBodyHtml += '<td style=" text-align:center;" ' + varRowSpan + '>' + varGradeData.Candidates[i].Assessments[j].NosList[m].NosCode + '</td>';
                              varTableBodyHtml += '<td style=" text-align:center;" ' + varRowSpan + '>' + varGradeData.Candidates[i].Assessments[j].NosList[m].NosName + '</td>';
                              }
                              varTableBodyHtml += '<td style=" vertical-align:top;" >' + varGradeData.Candidates[i].Assessments[j].NosList[m].PcList[k].PcText + '</td>';
                              varTableBodyHtml += '<td style=" vertical-align:top;" >' + varGradeData.Candidates[i].Assessments[j].NosList[m].PcList[k].PcObtainedMarks + '</td>';
                              varTableBodyHtml += '<td style=" vertical-align:top;" >' + varGradeData.Candidates[i].Assessments[j].NosList[m].PcList[k].PcMaximumMarks + '</td>';
                              //console.log(this.varNosId, this.varAssessmentId);
                              //this.hello(this.varNosId)
                            }
                          }
                        }
                      }
                    }
                    $("#tblEventBody").html(varTableBodyHtml);
                    $('#popupEventPreview').show('slow')
                    $('#popupEventPreview').show('slow')
                  
                  }



                },
            });
        }

  hideModel(){
      $(".modal").hide();
  }
}
