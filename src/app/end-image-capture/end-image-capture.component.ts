import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Subject, Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import * as os from 'os';
import { DeviceDetectorService } from 'ngx-device-detector';
import { getUserLocale } from 'get-user-locale';
@Component({
  selector: 'app-end-image-capture',
  templateUrl: './end-image-capture.component.html',
  styleUrls: ['./end-image-capture.component.css'],
})
export class EndImageCaptureComponent implements OnInit {
  constructor(private route: Router,private deviceservice:DeviceDetectorService) {}
  sub: string;
  Req: string;
  Id: string;
  ngOnInit(): void {
    this.sub = localStorage.getItem('assessment');
    this.Req = localStorage.getItem('req_id');
    this.Id = localStorage.getItem('cand_id');
  }

  public webcamImage1: WebcamImage = null;
  public id: string;

  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(id_image: string): void {
    this.id = id_image;
    this.trigger.next();
  }
  handleImage1(webcamImage: WebcamImage): void {
    if (this.id == 'btn1') {
      this.webcamImage1 = webcamImage;
    }
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleInitError(error: WebcamInitError): void {
    if (
      error.mediaStreamError &&
      error.mediaStreamError.name == 'NotAllowedError'
    ) {
      alert('Camera Permission was not allowed!');
      this.route.navigate(['login']);
    }
  }

  clicked() {
    let lat = localStorage.getItem('lat');
    let long = localStorage.getItem('long');

    var data = JSON.parse(localStorage.getItem('Response_data'));

    var ImageArrayContent = JSON.parse(localStorage.getItem('Image_Array'));
    var ImageArrayObj;
    if (localStorage.getItem('assessment') == 'theory') {
      data.CandidateAssessmentData.TheoryAssessment.EndImage.FileName =
        'REG' + data.CandidateAssessmentData.RegistrationId + '_TheoryEnd.png';
      data.CandidateAssessmentData.TheoryAssessment.EndImage.TimeStamp = moment().format(
        'DD-MMM-YYYY h:mm:ss a'
      );
      data.CandidateAssessmentData.TheoryAssessment.EndImage.Latitude = lat;
      data.CandidateAssessmentData.TheoryAssessment.EndImage.Longitude = long;
      ImageArrayObj = {
        FileName:
          'REG' +
          data.CandidateAssessmentData.RegistrationId +
          '_TheoryEnd.png',
        Image_Data: this.webcamImage1.imageAsDataUrl,
      };
      //ImageArrayContent.ImageArray.push(ImageArrayObj);
      //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
      this.Uploadfiles(ImageArrayObj);
      data.CandidateAssessmentData.TheoryAssessment.AssessmentEvents.push({
        DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
        SubTypeId: 24,
        Description: "Candidate has captured End Image",
        Latitude: lat,
        Longitude: long,
      });
      data.CandidateAssessmentData.TheoryAssessment.CandidateSystemInfo.SystemInfoDateTime = moment().format(
        'DD-MMM-YYYY hh:mm:ss a'
      );
      data.CandidateAssessmentData.TheoryAssessment.CandidateSystemInfo.OperatingSystem = this.deviceservice.os;
      data.CandidateAssessmentData.TheoryAssessment.CandidateSystemInfo.OperatingSystemVersion = this.deviceservice.os_version;
      data.CandidateAssessmentData.TheoryAssessment.CandidateSystemInfo.TotalPhysicalMemory = os.totalmem();
      data.CandidateAssessmentData.TheoryAssessment.CandidateSystemInfo.AvailablePhysicalMemory = os.freemem();
      data.CandidateAssessmentData.TheoryAssessment.CandidateSystemInfo.SystemLocale =
        window.navigator.language;
      data.CandidateAssessmentData.TheoryAssessment.CandidateSystemInfo.Latitude = lat;
      data.CandidateAssessmentData.TheoryAssessment.CandidateSystemInfo.Longitude = long;
      localStorage.setItem('Response_data', JSON.stringify(data));
      localStorage.setItem(
        this.Req + '_' + this.Id + '_data',
        JSON.stringify(data)
      );
      this.route.navigate(['feedback-theory']);
    } else if (localStorage.getItem('assessment') == 'practical') {
      data.CandidateAssessmentData.PracticalAssessment.EndImage.FileName =
        'REG' +
        data.CandidateAssessmentData.RegistrationId +
        '_PracticalEnd.png';
      data.CandidateAssessmentData.PracticalAssessment.EndImage.TimeStamp = moment().format(
        'DD-MMM-YYYY h:mm:ss a'
      );
      data.CandidateAssessmentData.PracticalAssessment.EndImage.Latitude = lat;
      data.CandidateAssessmentData.PracticalAssessment.EndImage.Longitude = long;
      ImageArrayObj = {
        FileName:
          'REG' +
          data.CandidateAssessmentData.RegistrationId +
          '_PracticalEnd.png',
        Image_Data: this.webcamImage1.imageAsDataUrl,
      };
      //ImageArrayContent.ImageArray.push(ImageArrayObj);
      //ocalStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
      this.Uploadfiles(ImageArrayObj);
      data.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push({
        DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
        SubTypeId: 24,
        Description: "Candidate has captured End Image",
        Latitude: lat,
        Longitude: long,
      });
      data.CandidateAssessmentData.PracticalAssessment.CandidateSystemInfo.SystemInfoDateTime = moment().format(
        'DD-MMM-YYYY hh:mm:ss a'
      );
      data.CandidateAssessmentData.PracticalAssessment.CandidateSystemInfo.OperatingSystem = this.deviceservice.os;
      data.CandidateAssessmentData.PracticalAssessment.CandidateSystemInfo.OperatingSystemVersion = this.deviceservice.os_version;
      data.CandidateAssessmentData.PracticalAssessment.CandidateSystemInfo.TotalPhysicalMemory = os.totalmem();
      data.CandidateAssessmentData.PracticalAssessment.CandidateSystemInfo.AvailablePhysicalMemory = os.freemem();
      data.CandidateAssessmentData.PracticalAssessment.CandidateSystemInfo.SystemLocale =
        window.navigator.language;
      data.CandidateAssessmentData.PracticalAssessment.CandidateSystemInfo.Latitude = lat;
      data.CandidateAssessmentData.PracticalAssessment.CandidateSystemInfo.Longitude = long;
      localStorage.setItem('Response_data', JSON.stringify(data));
      localStorage.setItem(
        this.Req + '_' + this.Id + '_data',
        JSON.stringify(data)
      );
      this.route.navigate(['feedback-practical']);
    } else if (localStorage.getItem('assessment') == 'viva') {
      data.CandidateAssessmentData.VivaMcqAssessment.EndImage.FileName =
        'REG' + data.CandidateAssessmentData.RegistrationId + '_VivaMcqEnd.png';
      data.CandidateAssessmentData.VivaMcqAssessment.EndImage.TimeStamp = moment().format(
        'DD-MMM-YYYY h:mm:ss a'
      );
      data.CandidateAssessmentData.VivaMcqAssessment.EndImage.Latitude = lat;
      data.CandidateAssessmentData.VivaMcqAssessment.EndImage.Longitude = long;
      ImageArrayObj = {
        FileName:
          'REG' +
          data.CandidateAssessmentData.RegistrationId +
          '_VivaMcqEnd.png',
        Image_Data: this.webcamImage1.imageAsDataUrl,
      };
      //ImageArrayContent.ImageArray.push(ImageArrayObj);
      this.Uploadfiles(ImageArrayObj);
      //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
      data.CandidateAssessmentData.VivaMcqAssessment.AssessmentEvents.push({
        DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
        SubTypeId: 24,
        Description: "Candidate has captured End Image",
        Latitude: lat,
        Longitude: long,
      });
      data.CandidateAssessmentData.VivaMcqAssessment.CandidateSystemInfo.SystemInfoDateTime = moment().format(
        'DD-MMM-YYYY hh:mm:ss a'
      );
      data.CandidateAssessmentData.VivaMcqAssessment.CandidateSystemInfo.OperatingSystem = this.deviceservice.os;
      data.CandidateAssessmentData.VivaMcqAssessment.CandidateSystemInfo.OperatingSystemVersion = this.deviceservice.os_version;
      data.CandidateAssessmentData.VivaMcqAssessment.CandidateSystemInfo.TotalPhysicalMemory = os.totalmem();
      data.CandidateAssessmentData.VivaMcqAssessment.CandidateSystemInfo.AvailablePhysicalMemory = os.freemem();
      data.CandidateAssessmentData.VivaMcqAssessment.CandidateSystemInfo.SystemLocale =
        window.navigator.language;
      data.CandidateAssessmentData.VivaMcqAssessment.CandidateSystemInfo.Latitude = lat;
      data.CandidateAssessmentData.VivaMcqAssessment.CandidateSystemInfo.Longitude = long;
      localStorage.setItem('Response_data', JSON.stringify(data));
      localStorage.setItem(
        this.Req + '_' + this.Id + '_data',
        JSON.stringify(data)
      );
      this.route.navigate(['feedback-viva']);
    }
  }

  Uploadfiles(ImageArrayContent: any) {
    $('#frmImages').append(
      '<input name="image_data" value="' + ImageArrayContent.Image_Data + '">'
    );
    $('#frmImages').append(
      '<input name="image_file_name" value="' +
        ImageArrayContent.FileName +
        '">'
    );

    var varForm = <HTMLFormElement>document.getElementById('frmImages');

    $.ajax({
      url: environment.Upload_files_URL,
      type: 'POST',
      data: new FormData(varForm),
      contentType: false,
      cache: false,
      processData: false,
      success: function (response) {
        console.log(response);
      },
      error: function (e) {
        alert('Error');
      },
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document
      .getElementById('webcam')
      .parentNode.removeChild(document.getElementById('webcam'));
  }
}
