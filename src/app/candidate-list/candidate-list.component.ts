import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { environment } from 'src/environments/environment';
import "datatables.net";
import { ajax } from 'jquery';



  var json_data: any;
  var varAssessmentVideoData:any;


@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  reqType:any;
  UserRole:any;
  userData : any;
  xment: any;
  cfirst : any;
  csecond:any;
 varAssessmentImageData :any;
 varImageIndex = 0;
 varImageUrl : any;
 varImageType = 0;
 varGoogleMapUrlFormat = 'https://www.google.com/maps/search/?api=1&query=[LAT],[LONG]';

 varVideoUrl = '';
 
 varVideoIndex = 0;

  constructor(private route: Router) { }

  ngOnInit(): void {

    this.reqType = sessionStorage.getItem('reqType');
    this.UserRole=sessionStorage.getItem('UserroleId')

    $.ajax({
      url: environment.URL_assessment_candidate_data,
      type: 'POST',
      dataType: 'json',
      data: {
        RequestId : sessionStorage.getItem('RequestId')
      },
      beforeSend: function(){
        $('#image').show();
      },
      complete: function(){
        $('#image').hide();
      },

      success: (data) => {
        var json = JSON.parse(JSON.stringify(data));
        this.userData = json.AssessmentCandidateData.Candidates

        for(var i=0; i<this.userData.length; i++){
          this.xment = json.AssessmentCandidateData.Candidates[i].Assessments
          this.cfirst = json.AssessmentCandidateData.Candidates[i].Assessments[0].AssessmentCategory
          this.csecond = json.AssessmentCandidateData.Candidates[i].Assessments[1].AssessmentCategory
        }

      }
    });


  }

  


  ShowAssessmentImages(CandidateId,ScheduleId,AssessmentId,itype,ExamMode,AssessmentCategory,AssessmentStatus){
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
        console.log(ExamMode)



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



  ShowAssessmentVideos(varCandidateId,varScheduleId, varAssessmentId, varExamMode)
        {
          var that = this;
            this.varVideoUrl = environment.image_url_certiplate + '/Videos/';
            if (varExamMode == 2 || varExamMode == 5) this.varVideoUrl = environment.image_url_fileserver;

            $("#videoPreview").hide();
            $("#divVideoPreviewControls").hide();
            $("#hdrVideoTitle").text('Response Videos');

            //$("#imgVideoPreview").attr("src", $("#hdnAppRootUrl").val() + 'Data/img/LoadingPreview.gif');
            $("#imgVideoPreview").show();

            $("#popupVideoPreview").show('slow')

            $("#txtSectionName").text('NA');
            $("#txtQuestionText").text('NA');            

            //this.ResetVideo();
            
            
            $.ajax({
                type: "POST",
                url: environment.URL_GetCandidateAssessmentVideoData,
                async: false,
                data: {
                    'CandidateId': varCandidateId,
                    'RequestId': sessionStorage.getItem('RequestId'),
                    'ScheduleId': varScheduleId,
                    'AssessmentId': varAssessmentId
                },
                //beforeSend: function (x) { if (x && x.overrideMimeType) { x.overrideMimeType("application/json;charset=UTF-8"); } },
                dataType: "jsonp",
                success: function (data) {
                    varAssessmentVideoData = data.CandidateAssessmentVideoData;
                    if (varAssessmentVideoData.length > 0)
                    {
                        $("#imgVideoPreview").hide();
                        $("#divVideoPreviewControls").show();
                        $("#videoPreview").show();
                        that.NavigateVideos('FIRST')
                    }
                    else
                    {
                        $("#hdrVideoTitle").text('Videos');
                        $("#imgVideoPreview").attr("src", 'assets/images/im.png' );
                    }
                },
                error: function (err) {
                    alert('ERROR:Please try again.');
                    return false;
                }
                
            });
        }

  NavigateVideos(varPosition)
        {
            //this.ResetVideo();
            console.log('Hello navigate func')
            if (varAssessmentVideoData == null) return;
            if (varAssessmentVideoData.length < 1) return;

            switch (varPosition) {
                case 'FIRST':
                    this.varVideoIndex = 0;
                    break;

                case 'PREVIOUS':
                    if (this.varVideoIndex > 0) this.varVideoIndex--;
                    break;

                case 'NEXT':
                    if (this.varVideoIndex < (varAssessmentVideoData.length - 1)) this.varVideoIndex++;
                    break;

                case 'LAST':
                    this.varVideoIndex = varAssessmentVideoData.length - 1;
                    break;
            }

            this.ShowAssessmentVideo();
        }

  ShowAssessmentVideo()
        {
            //this.ResetVideo();
            console.log('hello show video func')
            $("#btnVdoFirst").hide();
            $("#btnVdoPrevious").hide();
            $("#btnVdoNext").hide();
            $("#btnVdoLast").hide();

            $("#hdrVideoTitle").text('Response Videos');

            if (varAssessmentVideoData != null)
            {
                if (varAssessmentVideoData.length > 0)
                {
                    if (varAssessmentVideoData.length == 2)
                    {
                        $("#btnVdoFirst").show();
                        $("#btnVdoLast").show();
                    }
                    else if (varAssessmentVideoData.length > 2)
                    {
                        $("#btnVdoFirst").show();
                        $("#btnVdoPrevious").show();
                        $("#btnVdoNext").show();
                        $("#btnVdoLast").show();
                    }
                    
                    $("#hdrVideoTitle").text('Response Videos (' + (this.varVideoIndex + 1) + ' of ' + varAssessmentVideoData.length + ')');
                    $("#txtSectionName").val(varAssessmentVideoData[this.varVideoIndex].SectionName);
                    $("#txtQuestionText").val(varAssessmentVideoData[this.varVideoIndex].QuestionText); 
                    $("#videoPreview").attr("src", this.varVideoUrl + varAssessmentVideoData[this.varVideoIndex].VideoFileName);                    
                }
            }
        }

  
  ViewImageLocation()
        {
            if (this.varAssessmentImageData[this.varImageIndex].GoogleMapLocationUrl != '')
            {
                var win = window.open(this.varAssessmentImageData[this.varImageIndex].GoogleMapLocationUrl, '_blank');
                win.focus();
            }
        }


  

  ShowSystemInfo(CandidateId,ScheduleId,AssessmentId,ExamMode){
    

    $("#tblSystemInfo").hide();
            $("#tblSystemInfo2").hide();

            $("#lblSystemInfoDateTime").text('');
            $("#lblComputerName").text('');
            $("#lblComputerDomain").text('');
            $("#lblIpAddress").text('');
            $("#tdLocation").empty();
            $("#lblOSName").text('');
            $("#lblOSVersion").text('');
            $("#lblOSManufacturer").text('');
            $("#lblOSConfiguration").text('');
            $("#lblOSBuildType").text('');
            $("#lblProductId").text('');
            $("#lblSystemManufacturer").text('');
            $("#lblSystemModel").text('');
            $("#lblSystemType").text('');
            $("#lblProcessor").text('');
            $("#lblBIOSVersion").text('');
            $("#lblSystemLocale").text('');
            $("#lblTimeZone").text('');

            $("#lblDeviceSystemInfoDateTime").text('');
            $("#lblDeviceManufacturer").text('');
            $("#lblDeviceModel").text('');
            $("#lblDeviceHardware").text('');
            $("#tdDeviceLocation").empty();
            //$("#lblDeviceProduct").text('');
            $("#lblDeviceTags").text('');
            $("#lblDeviceType").text('');
            $("#lblDeviceSdkVersion").text('');
            $("#lblDeviceAppVersion").text('');
            $("#lblDeviceAndroidVersion").text('');

            $.ajax({
                type: "POST",
                url: environment.URL_GetCandidateAssessmentSystemInfoData,
                async: false,
                data: {
                    'CandidateId': CandidateId,
                    'RequestId': sessionStorage.getItem('RequestId'),
                    'ScheduleId': ScheduleId,
                    'AssessmentId': AssessmentId
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
                    if (data != null)
                    {
                        if (data.CandidateAssessmentSystemInfoData != null)
                        {
                            if (ExamMode == 2 || ExamMode == 5)
                            {
                                $("#lblDeviceSystemInfoDateTime").text(data.CandidateAssessmentSystemInfoData.SystemInfoDateTime);
                                $("#lblDeviceManufacturer").text(data.CandidateAssessmentSystemInfoData.DeviceManufacturer);
                                $("#lblDeviceModel").text(data.CandidateAssessmentSystemInfoData.DeviceModel);
                                $("#lblDeviceHardware").text(data.CandidateAssessmentSystemInfoData.DeviceHardware);

                                var varLocation = '-';
                                if (data.CandidateAssessmentSystemInfoData.Latitude != '' && data.CandidateAssessmentSystemInfoData.Longitude != '')
                                    varLocation = '<a class="btn btn-warning" (click)="ViewEventImageLocation(' + data.CandidateAssessmentSystemInfoData.Latitude + ',' + data.CandidateAssessmentSystemInfoData.Longitude + ')">View</a></td>';
                                $("#tdDeviceLocation").html(varLocation);

                                //$("#tdDeviceProduct").text(data.CandidateAssessmentSystemInfoData.DeviceProduct);
                                $("#lblDeviceTags").text(data.CandidateAssessmentSystemInfoData.DeviceTags);
                                $("#lblDeviceType").text(data.CandidateAssessmentSystemInfoData.DeviceType);
                                $("#lblDeviceSdkVersion").text(data.CandidateAssessmentSystemInfoData.DeviceSdkVersion);
                                $("#lblDeviceAppVersion").text(data.CandidateAssessmentSystemInfoData.DeviceAppVersion);
                                $("#lblDeviceAndroidVersion").text(data.CandidateAssessmentSystemInfoData.DeviceAndroidVersion);

                                $("#tblSystemInfo2").show();
                            }
                            else
                            {
                                $("#lblSystemInfoDateTime").text(data.CandidateAssessmentSystemInfoData.SystemInfoDateTime);
                                $("#lblComputerName").text(data.CandidateAssessmentSystemInfoData.ComputerName);
                                $("#lblComputerDomain").text(data.CandidateAssessmentSystemInfoData.Domain);
                                $("#lblIpAddress").text(data.CandidateAssessmentSystemInfoData.IPv4Address);

                                var varLocation = '-';
                                if (data.CandidateAssessmentSystemInfoData.Latitude != '' && data.CandidateAssessmentSystemInfoData.Longitude != '')
                                    varLocation = '<a class="btn btn-warning" (click)="ViewEventImageLocation(' + data.CandidateAssessmentSystemInfoData.Latitude + ',' + data.CandidateAssessmentSystemInfoData.Longitude + ')">View</a></td>';
                                $("#tdLocation").html(varLocation);

                                $("#lblOSName").text(data.CandidateAssessmentSystemInfoData.OperatingSystem);
                                $("#lblOSVersion").text(data.CandidateAssessmentSystemInfoData.OperatingSystemVersion);
                                $("#lblOSManufacturer").text(data.CandidateAssessmentSystemInfoData.OperatingSystemManufacturer);
                                $("#lblOSConfiguration").text(data.CandidateAssessmentSystemInfoData.OperatingSystemConfiguration);
                                $("#lblOSBuildType").text(data.CandidateAssessmentSystemInfoData.OperatingSystemBuildType);
                                $("#lblProductId").text(data.CandidateAssessmentSystemInfoData.ProductId);
                                $("#lblSystemManufacturer").text(data.CandidateAssessmentSystemInfoData.SystemManufacturer);
                                $("#lblSystemModel").text(data.CandidateAssessmentSystemInfoData.SystemModel);
                                $("#lblSystemType").text(data.CandidateAssessmentSystemInfoData.SystemType);
                                $("#lblProcessor").text(data.CandidateAssessmentSystemInfoData.Processor);
                                $("#lblBIOSVersion").text(data.CandidateAssessmentSystemInfoData.BIOSVersion);
                                $("#lblSystemLocale").text(data.CandidateAssessmentSystemInfoData.SystemLocale);
                                $("#lblTimeZone").text(data.CandidateAssessmentSystemInfoData.TimeZone);

                                $("#tblSystemInfo").show();
                            }                            

                            $('#popupSystemInfo').show('slow');
                        }
                    }
                },
                error: function (err)
                {
                    alert('ERROR:Please try again.');
                    return false;
                }
            });
            return false;
  }

  ShowAssessmentEvents(varCandidateId, varScheduleId, varAssessmentId, ExamMode)
        {
            $.ajax({
                type: "POST",
                url: environment.URL_GetCandidateAssessmentEventData,
                async: false,
                data: {
                    'CandidateId': varCandidateId,
                    'RequestId': sessionStorage.getItem('RequestId'),
                    'ScheduleId': varScheduleId,
                    'AssessmentId': varAssessmentId
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
                    var varResponse = '', varElapsedSeconds = '';
                    $("#tblEventBody").empty();
                    if (data.CandidateAssessmentEventData != null)
                    {
                        if (data.CandidateAssessmentEventData != null)
                        {
                            var varTableBodyHtml = '', varRowSpan = '';
                            for (var i = 0; i < data.CandidateAssessmentEventData.length; i++)
                            {
                                varTableBodyHtml += '<tr>';
                                varTableBodyHtml += '<td>' + data.CandidateAssessmentEventData[i].EventDateTime       + '</td>';
                                varTableBodyHtml += '<td>' + data.CandidateAssessmentEventData[i].EventType           + '</td>';
                                varTableBodyHtml += '<td>' + data.CandidateAssessmentEventData[i].EventSubType        + '</td>';
                                varTableBodyHtml += '<td>' + data.CandidateAssessmentEventData[i].EventDescription    + '</td>';

                                if (data.CandidateAssessmentEventData[i].SectionIndex < 0)
                                    varTableBodyHtml += '<td>-</td>';
                                else
                                    varTableBodyHtml += '<td>' + (data.CandidateAssessmentEventData[i].SectionIndex + 1) + '</td>';

                                if (data.CandidateAssessmentEventData[i].QuestionIndex < 0)
                                    varTableBodyHtml += '<td>-</td>';
                                else
                                    varTableBodyHtml += '<td>' + (data.CandidateAssessmentEventData[i].QuestionIndex + 1) + '</td>';

                                varResponse = '-';
                                if (data.CandidateAssessmentEventData[i].CurrentResponse >= 0)
                                    varResponse = '' + (data.CandidateAssessmentEventData[i].CurrentResponse + 1);
                                varTableBodyHtml += '<td>' + varResponse + '</td>';

                                varTableBodyHtml += '<td>' + data.CandidateAssessmentEventData[i].FormattedSecondDifference + '</td>';  

                                if (data.CandidateAssessmentEventData[i].EventImage != undefined && data.CandidateAssessmentEventData[i].EventImage != null && data.CandidateAssessmentEventData[i].EventImage != '') 
                                    varTableBodyHtml += '<td><a class="btn btn-info" (click)="ViewEventImage(\'' + data.CandidateAssessmentEventData[i].EventImage + '\',' + ExamMode + ')">View</a></td>';
                                else
                                    varTableBodyHtml += '<td><center>-<center></td>';

                                if (data.CandidateAssessmentEventData[i].Latitude != '' && data.CandidateAssessmentEventData[i].Longitude != '')
                                    varTableBodyHtml += '<td><a class="btn btn-warning (click)="ViewEventImageLocation(\'' + data.CandidateAssessmentEventData[i].Latitude + '\',\'' + data.CandidateAssessmentEventData[i].Longitude + '\')>View</a></td>';
                                    //varTableBodyHtml += '<td><a class="btn btn-success" >View</a></td>';

                                else
                                    varTableBodyHtml += '<td><center>-<center></td>';

                                varTableBodyHtml += '</tr>';
                            }

                            $("#tblEventBody").html(varTableBodyHtml);

                            $('#popupEventPreview').show('slow')
                        }
                    }
                },
                error: function (err)
                {
                    alert('ERROR:Please try again.');
                    return false;
                }
            });
            return false;
        }


        ViewEventImage(varEventImageFile, varExamMode)
        {
            if (varEventImageFile.trim() != '')
            {
                this.varImageUrl = environment.image_url_certiplate + 'Images/';
                if (varExamMode == 2 || varExamMode == 5) this.varImageUrl = environment.image_url_fileserver;

                var win = window.open(this.varImageUrl + varEventImageFile, '_blank');
                win.focus();
            }
        }



  ViewEventImageLocation(latitude, longitude)
        {
          alert(latitude + '-'+  longitude)
            var varUrl = this.varGoogleMapUrlFormat.replace("[LAT]", latitude).replace("[LONG]", longitude);
            console.log(varUrl)
            var win = window.open(varUrl, '_blank');
            win.focus();
        }


  PendingEvaluation(CandidateId,ScheduleId,AssessmentId){
    sessionStorage.setItem('CandidateId', CandidateId)
    sessionStorage.setItem('ScheduleId',ScheduleId)
    sessionStorage.setItem('AssessmentId',AssessmentId)
    this.route.navigate(['CandidateAssessmentEvaluation'])
  }
/*
    
    $(function () {

      var table = $("#myTable").DataTable({
        lengthMenu: [5, 10, 15, 25, 50, 100],
        pageLength: 10,
        destroy: true,
        autoWidth : true,
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
            targets: [0,9],
            className : "dt-center",
            createdCell : function(td, cellData, rowData, row, col){
              $(td).css('color', 'black')
            }
        },

        {
          targets: [8],
          width : "150px",
          className : "dt-center",
      },
          {
            targets: ["_all"],
            className: "dt-center",
            width : "100px",
            render: function(data,type,row){
              var color = 'black';
              return '<span style=" height:100px;color:' + color + '">' + data + '</span>';
            }
          },
        ],

        ajax: {
          url: environment.URL_assessment_candidate_data,
          type: 'POST',
          dataType: 'json',
          data: {
            RequestId : sessionStorage.getItem('RequestId')
          },

          dataSrc: "AssessmentCandidateData.Candidates",
          beforeSend: function(){
            $('#image').show();
          },
          complete: function(){
            $('#image').hide();
          },

        },

        columns: [
          {data : "CandidateName"},
          {data : "CandidateName"},
          
          {data : "RegistrationId"},
          {data : "ContactNumber"},
          {data : "Gender"},
          {data : "GuardianName",
          render : function(data,type,row){
            if(row.GuardianName == ''){
              return '<span style="color:black">NA</span>';
            }
            else{
              return '<span style="color:black">' + data + '</span>';
            }
          }
        },
          {data : "Assessments.[ ].AssessmentCategory"},
          {data : "Assessments.[  ].AssessmentStatus"},
          
          {data : "Assessments.[, ].AssessmentStatus",
          render : function(data,type,row){
            if(row.Assessments[0].AssessmentStatus == "Not Started"){
              return '<span style="color:black">--</span>'
            }
            else{
              return `
                  <a class="btn" style=" width:25px;height:25px; margin-right:2px;background-color:rgb(255, 207, 120); border-color:rgb(197, 197, 197);">
                  <i class="icon-user"></i></a>  
                  <a class="btn" style="width:25px;height:25px;margin-right:2px;background-color:rgb(225, 153, 182); border-color:rgb(225, 153, 182);">
                  <i class="icon-user"></i></a> 
                  <a class="btn" style="width:25px;height:25px;margin-right:2px;background-color:rgb(91, 134, 138);  border-color:rgb(91, 134, 138);">
                  <i class="icon-user"></i></a> 
                  <a class="btn" style="width:25px;height:25px;margin-right:2px;background-color:rgb(135, 135, 161); border-color:rgb(197, 197, 197);">
                  <i class="icon-user"></i></a>
                  
                  <br>
                  
                  <a class="btn" style="width:25px;height:25px;margin-top:3px;margin-right:2px;background-color:rgb(135, 135, 161); border-color:rgb(197, 197, 197);">
                  <i class="icon-user"></i></a>
                  <a class="btn" style="width:25px;height:25px;margin-top:3px;margin-right:2px;background-color:rgb(225, 153, 182); border-color:rgb(225, 153, 182);">
                  <i class="icon-user"></i></a> 
                  <a class="btn" style="width:25px;height:25px;margin-top:3px;margin-right:2px;background-color:rgb(91, 134, 138);  border-color:rgb(91, 134, 138);">
                  <i class="icon-user"></i></a> 
                  <a class="btn" style="width:25px;height:25px;margin-top:3px;margin-right:2px;background-color:rgb(135, 135, 161); border-color:rgb(197, 197, 197);">
                  <i class="icon-user"></i></a>
                
                  `
            }
          }
        },
          {data : "Assessments.[, ].AssessmentStatus",
          render : function(data,type,row){
            if(row.Assessments[0].AssessmentStatus == "Not Started"){
              return '<span style="color:black">--</span>'
            }
            else{
              return `
              <a class="btn" style="width:25px;height:22px;margin-top:3px;margin-right:2px;background-color:rgb(157, 157, 157); border-color:rgb(197, 197, 197);">
              <i class="icon-user"></i></a>  
              <a class="btn" style="width:25px;height:22px;margin-top:3px;margin-right:2px;background-color:rgb(108, 199, 146); border-color:rgb(108, 199, 146);">
              <i class="icon-user"></i></a> 

              <br>

              <a class="btn" style="width:25px;height:22px;margin-top:3px;margin-right:2px;background-color:rgb(157, 157, 157); border-color:rgb(197, 197, 197);">
              <i class="icon-user"></i></a>  
              <a class="btn" style="width:25px;height:22px;margin-top:3px;margin-right:2px;background-color:rgb(108, 199, 146); border-color:rgb(108, 199, 146);">
              <i class="icon-user"></i></a> 
              
              `
            }
          }
        },
          {data : "Assessments.[, ].AssessmentStatus",
          render : function(data,type,row){
            if(row.Assessments[0].AssessmentStatus == "Evaluation Pending" || row.Assessments[1].AssessmentStatus == "Evaluation Pending"){
              return `
              <a class="btn" style="margin-right:2px;background-color:rgb(157, 157, 157); border-color:rgb(197, 197, 197);">
              <i class="icon-user"></i></a>  
              <a class="btn" style="margin-right:2px;background-color:rgb(108, 199, 146); border-color:rgb(108, 199, 146);">
              <i class="icon-user"></i></a>
              `
              
            }
            else{
              return '<span style="color:black">--</span>'
            }
          }
        },
        ]

      });


      $("#myTable").on("click", "tbody tr td", function () {
        var index1 = table.row(this).index();
        var index2 = table.column(this).index();
        sessionStorage.setItem("CandidateId",json_data.AssessmentCandidateData.Candidates[index1].CandidateId);
        sessionStorage.setItem("ScheduleId",json_data.AssessmentCandidateData.Candidates[index1].Assessments.ScheduleId);

        $.ajax({
          url: environment.URL_assessment_candidate_data,
          type: 'POST',
          dataType: 'json',
          data: {
            RequestId : sessionStorage.getItem('RequestId')
          },
          success: (data) => {
            var json = JSON.parse(JSON.stringify(data));
            //sessionStorage.setItem("RequestId",json_data.AssessmentCandidateData[index1].RequestId);
            sessionStorage.setItem("AssessmentId",json.AssessmentCandidateData.Candidates[index1].Assessments.AssessmentId);
    
          }
        });

      });

      table.on( 'order.dt search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    })
  }*/

}
