import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { environment } from 'src/environments/environment';
import "datatables.net";
import { ajax } from 'jquery';

var json_data: any;
var varPracticalData: any;

@Component({
  selector: 'app-assessment-evaluation',
  templateUrl: './assessment-evaluation.component.html',
  styleUrls: ['./assessment-evaluation.component.css']
})
export class AssessmentEvaluationComponent implements OnInit {
  reqType:any;
  userData : any;
  UserRole:any;
  PCs : any;
  

  constructor(private router: Router) { }


  ngOnInit(): void {
    this.UserRole=sessionStorage.getItem('UserroleId')
    this.reqType = sessionStorage.getItem('reqType')
    this.LoadPracticalAssessmentData()
      }

 LoadPracticalAssessmentData(){
        $.ajax({
            type: "POST",
            url: environment.URL_assessment_evaluation_data,
            data: {
                RequestId : sessionStorage.getItem('RequestId'),
                CandidateId : sessionStorage.getItem('CandidateId'),
                ScheduleId : sessionStorage.getItem('ScheduleId'),
                AssessmentId : sessionStorage.getItem('AssessmentId')

            },
            dataType: "jsonp",
            success: function (data) {
                $("#tblBody").empty();
                varPracticalData = data.PracticalAssessmentEvaluationData;
                console.log(varPracticalData)
                if (data.PracticalAssessmentEvaluationData != null)
                {
                    var varVideoUrl = environment.image_url_fileserver
                    if (varPracticalData.ExamMode == 3 || varPracticalData.ExamMode == 4 || varPracticalData.ExamMode == 6)
                        varVideoUrl = environment.image_url_certiplate + '/Videos/';

                    if (varPracticalData.Sections != null)
                    {
                        var varTableBodyHtml = '', varRowSpan = '', varObservationInputName = '', varVivaInputName = '', varRowCounter = 0, varLabelRowCounter = 0;

                        for (var i = 0; i < varPracticalData.Sections.length; i++)
                        {
                            if (varPracticalData.Sections[i].Questions != null)
                            {
                                for (var j = 0; j < varPracticalData.Sections[i].Questions.length; j++)
                                {
                                    varRowCounter++;

                                    if (varPracticalData.Sections[i].Questions[j].PCs != null)
                                    {
                                        varRowSpan = 'rowspan="' + varPracticalData.Sections[i].Questions[j].PCs.length + '"';

                                        for (var k = 0; k < varPracticalData.Sections[i].Questions[j].PCs.length; k++)
                                        {
                                            varLabelRowCounter++;
                                            varTableBodyHtml += '<tr>';
                                            if (k == 0)
                                            {
                                                varTableBodyHtml += '<td style="border-bottom: 2px black; vertical-align:top;"' + varRowSpan + '>' + varRowCounter + '</td>';
                                                varTableBodyHtml += '<td style=" vertical-align:top;" ' + varRowSpan + '>' + varPracticalData.Sections[i].SectionName + '</td>';
                                                varTableBodyHtml += '<td style=" vertical-align:top;" ' + varRowSpan + '>' + varPracticalData.Sections[i].Questions[j].QuestionText + '</td>';
                                                varTableBodyHtml += '<td style=" vertical-align:top;"' + varRowSpan + ' style="text-align:center;">';

                                                if (varPracticalData.Sections[i].Questions[j].VideoResponseFileName != '')
                                                {
                                                    varTableBodyHtml += '<video style=" vertical-align:top;" width="240" height="135" src="' + varVideoUrl + data.PracticalAssessmentEvaluationData.Sections[i].Questions[j].VideoResponseFileName + '" controls /></td>';
                                                }
                                                else
                                                {
                                                    varTableBodyHtml += 'NA</td>';
                                                }
                                            }

                                            varTableBodyHtml += '<td>' + varPracticalData.Sections[i].Questions[j].PCs[k].PerformanceCriteriaText + '</td>';

                                            if (varPracticalData.Sections[i].Questions[j].PCs[k].ObservationWeightage > 0)
                                            {
                                                varObservationInputName = 'Observation_' + varPracticalData.Sections[i].Questions[j].QuestionId + '_' + varLabelRowCounter;
                                                varTableBodyHtml += '<td style="text-align:center;"><label id="lbl_' + varObservationInputName + '">' + varPracticalData.Sections[i].Questions[j].PCs[k].ObservationWeightage + '</label></td>';
                                                varTableBodyHtml += '<td style="text-align:center;"><input type="text" id="' + varObservationInputName + '" name="' + varObservationInputName + '" class="input-medium" /><label id="lbl' + varObservationInputName + '" style="color:red;margin-top:-10px;display:none;font-size:11px;">Please enter value!</label></td>';
                                            }
                                            else
                                            {
                                                varTableBodyHtml += '<td style="text-align:center;">-</td>'; 
                                                varTableBodyHtml += '<td style="text-align:center;">-</td>'; 
                                            }

                                            if (varPracticalData.Sections[i].Questions[j].PCs[k].VivaWeightage > 0)
                                            {
                                                varVivaInputName = 'Viva_' + varPracticalData.Sections[i].Questions[j].QuestionId + '_' + varLabelRowCounter;
                                                varTableBodyHtml += '<td style="text-align:center;"><label id="lbl_' + varVivaInputName + '">' + varPracticalData.Sections[i].Questions[j].PCs[k].VivaWeightage + '</label></td>';
                                                varTableBodyHtml += '<td style="text-align:center;"><input type="text" id="' + varVivaInputName + '" name="' + varVivaInputName + '" class="input-medium" /><label id="lbl' + varVivaInputName + '" style="color:red;margin-top:-10px;display:none;font-size:11px;">Please enter value!</label></td>';
                                            }
                                            else
                                            {
                                                varTableBodyHtml += '<td style="text-align:center;">-</td>';
                                                varTableBodyHtml += '<td style="text-align:center;">-</td>';
                                            }

                                            varTableBodyHtml += '</tr>';
                                        }
                                    } 
                                }
                            }                                
                        }

                        $("#tblBody").html(varTableBodyHtml);

                        $("#btnSubmit").show();
                        //console.log(this.varPracticalData.Sections)
                    }
                }
            },
        });

      }
    
 SubmitEvaluation()
      {
          $("#lblSubmitStatus").hide();

          //event.preventDefault();
          
          if (!this.ValidateInputs()) return;
          var varCandidateMarks = '', varLabelRowCounter = 0, TotalObtainedMarks = 0, varObservationTextId = '', varVivaTextId = '';
            var varCandidateMarksArray = [], NosSummary = '', varNosId = '', NosMarksArray = [], varTotalSectionMarks = 0;

            var varTotalSectionObservationAllottedMarks = 0, varTotalSectionVivaAllottedMarks = 0, varTotalSectionObservationObtainedMarks = 0, varTotalSectionVivaObtainedMarks = 0;

            for (var i = 0; i < varPracticalData.Sections.length; i++)
            {
                varNosId = '' + varPracticalData.Sections[i].NosId;

                varTotalSectionObservationAllottedMarks = 0;
                varTotalSectionVivaAllottedMarks = 0;

                varTotalSectionObservationObtainedMarks = 0;
                varTotalSectionVivaObtainedMarks = 0;

                varTotalSectionMarks = 0;

                for (var j = 0; j < varPracticalData.Sections[i].Questions.length; j++)
                {
                    for (var k = 0; k < varPracticalData.Sections[i].Questions[j].PCs.length; k++)
                    {
                        varLabelRowCounter++;

                        if (parseFloat(varPracticalData.Sections[i].Questions[j].PCs[k].ObservationWeightage) > 0)
                        {
                            varTotalSectionObservationAllottedMarks += parseFloat(varPracticalData.Sections[i].Questions[j].PCs[k].ObservationWeightage);

                            varObservationTextId = "Observation_" + varPracticalData.Sections[i].Questions[j].QuestionId + "_" + varLabelRowCounter;
                            let obs_value = ($("#" + varObservationTextId).val()).toString()
                            //console.log(value);
                            varTotalSectionObservationObtainedMarks += parseFloat(obs_value);
                        }

                        if (parseFloat(varPracticalData.Sections[i].Questions[j].PCs[k].VivaWeightage) > 0)
                        {
                            varTotalSectionVivaAllottedMarks += parseFloat(varPracticalData.Sections[i].Questions[j].PCs[k].VivaWeightage);

                            varVivaTextId = "Viva_" + varPracticalData.Sections[i].Questions[j].QuestionId + "_" + varLabelRowCounter;
                            let viva_value = ($("#" + varVivaTextId).val()).toString()
                            varTotalSectionVivaObtainedMarks += parseFloat(viva_value);
                        }
                    }
                }

                varTotalSectionMarks = varTotalSectionObservationObtainedMarks + varTotalSectionVivaObtainedMarks;
                TotalObtainedMarks += varTotalSectionMarks;

                varCandidateMarksArray.push('' + varNosId + ',' + varTotalSectionObservationObtainedMarks + '_' + varTotalSectionObservationAllottedMarks + ':' + varTotalSectionVivaObtainedMarks + '_' + varTotalSectionVivaAllottedMarks);
                //alert('' + varNosId + ',' + varTotalSectionObservationObtainedMarks + '_' + varTotalSectionObservationAllottedMarks + ':' + varTotalSectionVivaObtainedMarks + '_' + varTotalSectionVivaAllottedMarks);
                
                NosMarksArray.push('' + varNosId + ':' + varTotalSectionMarks);    
                //alert('' + varNosId + ':' + varTotalSectionMarks);
            }  

            varCandidateMarks = varCandidateMarksArray.join(',');
            NosSummary = NosMarksArray.join(',');

            //alert('varCandidateMarks : ' + varCandidateMarks);
            //alert('NosSummary : ' + NosSummary);
            //alert('TotalObtainedMarks : ' + TotalObtainedMarks);

            $.ajax({
                type: "POST",
                url: environment.URL_SubmitPracticalAssessment,
                //async: false,
                data: {
                    CandidateId       : sessionStorage.getItem('CandidateId'),
                    RequestId         : sessionStorage.getItem('RequestId'),
                    ScheduleId        : sessionStorage.getItem('ScheduleId'),
                    AssessmentId      : sessionStorage.getItem('AssessmentId'),
                    CandidateMarks    : varCandidateMarks,
                    TotalObtainedMarks: TotalObtainedMarks,
                    NosMarks         : NosSummary


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
                    var varFailure = true;
                    if (data.SubmitPracticalAssessmentEvaluationData != null)
                    {
                        if (data.SubmitPracticalAssessmentEvaluationData.AssessmentScoreId > 0)
                        {
                            varFailure = false;
                            window.location.href = '/AssessmentEvaluationCandidateList?r=' + sessionStorage.getItem('RequestId') + "&sts=1";                            
                        }
                    }

                    if (varFailure) $("#lblSubmitStatus").show();
                },
                error: function (err) {
                    alert('ERROR:Please try again.');
                    return false;
                }
            });

            return false;

          
      }

  ValidateInputs() {
          var varReturnValue = true;
          $("#tblBody").find('label').filter( void function ()
          {
              if (!$(this).prop('id').startsWith("lbl_")) $(this).hide();
          })

          var varFocus = false;
          $("#tblBody").find('input').filter(void function () {
              if (this.value == '')
              {
                  $("#lbl" + this.id).text('Please enter marks!');
                  $("#lbl" + this.id).show();
                  if (!varFocus)
                  {
                      cursorFocus(this);
                      varFocus = true;
                  }

                  varReturnValue = false;
              }
              else
              {
                  if (parseFloat(this.value) < 0)
                  {
                      $("#lbl" + this.id).text('Obtained marks cannot be a negative value!');
                      $("#lbl" + this.id).show();
                      if (!varFocus)
                      {
                          cursorFocus(this);
                          varFocus = true;
                      }

                      varReturnValue = false;
                  }
                  else
                  {
                      var varWeightageText = $("#lbl_" + this.id).text();
                      if (parseFloat(this.value) > parseFloat(varWeightageText))
                      {
                          $("#lbl" + this.id).text('Obtained marks cannot be greater than allotted!');
                          $("#lbl" + this.id).show();
                          if (!varFocus)
                          {
                              cursorFocus(this);
                              varFocus = true;
                          }

                          varReturnValue = false;
                      }
                  }                    
              }
          })

          return varReturnValue;


      var cursorFocus = function (elem) {
          var x = elem.scrollX, y = elem.scrollY;
          window.scrollTo(x, y);
          elem.focus();            
      }
   

    }
}
