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


  myFunction(){
    var input, filter, table, tr, td1, td2, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
    td1 = tr[i].getElementsByTagName("td")[4];
    td2 = tr[i].getElementsByTagName("td")[6];
    if (td1) {
      txtValue = td1.textContent || td1.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
  }


  ShowAssessmentImages(CandidateId,ScheduleId,AssessmentId,itype,ExamMode){
    //alert(CandidateId+ ' - ' +ScheduleId+ ' - ' +AssessmentId+ ' - ' +itype+ ' - ' +AssessmentCategory + ' - ' +AssessmentStatus)
    
    
    this.varImageType = itype;
    this.varImageUrl = environment.image_url_certiplate + '/Images/';
            if (ExamMode == 2 || ExamMode == 5) this.varImageUrl = environment.image_url_fileserver;

    $.ajax({
      url: environment.URL_GetCandidateAssessmentImageData,
      type: 'POST',
      dataType: 'json',
      data: {
        RequestId : sessionStorage.getItem('RequestId'),
        CandidateId : CandidateId,
        ScheduleId : ScheduleId,
        AssessmentId : AssessmentId,
        ImageTypeId : itype
      },
      beforeSend: function(){
        $('#image').show();
      },
      complete: function(){
        $('#image').hide();
      },

      success: (data) => {
        console.log("Done.....")
                    this.varAssessmentImageData = data.CandidateAssessmentImageData;
                    
                    if(itype==1){
                      $("#myModal").show('slow',function(){
                        $('#hdrImageTitle').text('Start Image');
                        $('#btnFirst').text('Start Image');
                        $('#btnLast').text('End Image');
                        $('#btnViewMap').text('View Map');
                      });
                    }

                    if(itype==2){
                      $("#myModal").show('slow',function(){
                        $('#hdrImageTitle').text('Identity Image');
                        $('#btnViewMap').text('View Map');
                      });
                    }
                    if(itype==3){
                      $("#myModal").show('slow',function(){
                        $('#hdrImageTitle').text('Screenshot Image');
                      });
                    }

                    if(itype==4){
                      $("#myModal").show('slow',function(){
                        $('#hdrImageTitle').text('Snapshot Image');
                      });
                    }
                    
                    this.NavigateImage('FIRST')
      }
    });
  }

  hideModel(){
    $(".modal").hide();
  }

  NavigateImage(pos){
            if (this.varAssessmentImageData == null)
            {

              console.log(this.varAssessmentImageData)
              $('.modal-content .modal-body').html("<img src= 'assets/images/im.png' style='height: 300px; margin-left:25%'/>")
                return;
            }

            if (this.varAssessmentImageData < 1)
            {
              console.log(this.varAssessmentImageData)
              $('.modal-content .modal-body').html("<img src= 'assets/images/im.png' style='height: 300px; margin-left:25%'/>")
                return;
            }

            switch (pos)
            {
                case 'FIRST':
                    this.varImageIndex = 0;
                    break;

                case 'PREVIOUS':
                    if (this.varImageIndex > 0) this.varImageIndex--;
                    break;
  
                case 'NEXT':
                    if (this.varImageIndex < (this.varAssessmentImageData.length - 1)) this.varImageIndex++;
                    break;

                case 'LAST':
                    this.varImageIndex = this.varAssessmentImageData.length - 1;
                    break;
            }
            this.ShowAssessmentImage();
    
  }

  ShowAssessmentImage(){

    console.log(this.varImageType)
    $("#btnFirst").hide();
    $("#btnPrevious").hide();
    $("#btnNext").hide();
    $("#btnLast").hide();
    $("#btnViewMap").hide();
    $("#lblTimeStamp").text('');
  
    if (this.varAssessmentImageData != null)
            {
                if (this.varAssessmentImageData.length > 0)
                {
                    if (this.varImageType == 1)
                    {
                        if (this.varImageIndex == 0) $("#hdrImageTitle").text('Start Image');
                        else if (this.varImageIndex == 1) $("#hdrImageTitle").text('End Image');
                        else $("#hdrImageTitle").text('Image');

                        $("#btnFirst").show();
                        $("#btnLast").show();
                    }
                    else if (this.varImageType == 2)
                    {
                        $("#hdrImageTitle").text('Identity Image');
                    }
                    else if (this.varImageType == 3)
                    {
                        $("#hdrImageTitle").text('Screenshot Images (' + (this.varImageIndex + 1) + ' of ' + this.varAssessmentImageData.length + ')');

                        if (this.varAssessmentImageData.length == 2)
                        {
                            $("#btnFirst").show();
                            $("#btnLast").show();
                        }
                        else if (this.varAssessmentImageData.length > 2)
                        {
                            $("#btnFirst").show();
                            $("#btnPrevious").show();
                            $("#btnNext").show();
                            $("#btnLast").show();
                        }
                    }
                    else if (this.varImageType == 4)
                    {
                        $("#hdrImageTitle").text('Snapshot Images (' + (this.varImageIndex + 1) + ' of ' + this.varAssessmentImageData.length + ')');
                        if (this.varAssessmentImageData.length == 2)
                        {
                            $("#btnFirst").show();
                            $("#btnLast").show();
                        }
                        else if (this.varAssessmentImageData.length > 2)
                        {
                            $("#btnFirst").show();
                            $("#btnPrevious").show();
                            $("#btnNext").show();
                            $("#btnLast").show();
                        }
                    }

                    if (this.varAssessmentImageData[this.varImageIndex].ImageTimeStamp == '') $("#lblTimeStamp").text('');
                    else $("#lblTimeStamp").html("<b>Captured at :</b> " + this.varAssessmentImageData[this.varImageIndex].ImageTimeStamp);

                    if (this.varAssessmentImageData[this.varImageIndex].GoogleMapLocationUrl != '') $("#btnViewMap").show();

                    if (this.varAssessmentImageData[this.varImageIndex].ImageFileName.trim() == '')
                        $('.modal-content .modal-body').html("<img src= 'assets/images/im.png' style='height: 300px; margin-left:25%'/>")

                    else
                        $("#imgPreview").attr("src", this.varImageUrl + this.varAssessmentImageData[this.varImageIndex].ImageFileName);
                }
            }
  }
 
}


