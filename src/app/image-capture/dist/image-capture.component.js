"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImageCaptureComponent = void 0;
var environment_1 = require("./../../environments/environment");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var moment = require("moment");
var ImageCaptureComponent = /** @class */ (function () {
    function ImageCaptureComponent(router, route) {
        this.router = router;
        this.route = route;
        this.webcamImage1 = null;
        this.webcamImage2 = null;
        this.trigger = new rxjs_1.Subject();
    }
    ImageCaptureComponent.prototype.ngOnInit = function () {
        this.sub = localStorage.getItem('assessment');
        this.Req = localStorage.getItem('req_id');
        this.Id = localStorage.getItem('cand_id');
    };
    ImageCaptureComponent.prototype.triggerSnapshot = function (id_image) {
        this.id = id_image;
        this.trigger.next();
    };
    ImageCaptureComponent.prototype.handleImage1 = function (webcamImage) {
        if (this.id == 'btn1') {
            this.webcamImage1 = webcamImage;
        }
        if (this.id == 'btn2') {
            this.webcamImage2 = webcamImage;
        }
    };
    Object.defineProperty(ImageCaptureComponent.prototype, "triggerObservable", {
        get: function () {
            return this.trigger.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    ImageCaptureComponent.prototype.clicked = function () {
        $('#move-in').css('display', 'block');
        $('#submit_button').css('display', 'none');
        var data = JSON.parse(localStorage.getItem(this.Req + '_' + this.Id + '_' + 'data'));
        var ImageArrayObj_start, ImageArrayObj_Id;
        var ImageArrayContent = {
            ImageArray: []
        };
        var Req = this.Req;
        var Id = this.Id;
        var route = this.route;
        var lat, long;
        if (this.sub == 'theory') {
            data.CandidateAssessmentData.TheoryAssessment.StartImage.FileName =
                'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_TheoryStart.png';
            data.CandidateAssessmentData.TheoryAssessment.StartImage.TimeStamp = moment().format('DD-MMM-YYYY h:mm:ss a');
            ImageArrayObj_start = {
                FileName: 'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_TheoryStart.png',
                Image_Data: this.webcamImage1.imageAsDataUrl
            };
            ImageArrayContent.ImageArray.push(ImageArrayObj_start);
            data.CandidateAssessmentData.TheoryAssessment.IdentityImage.FileName =
                'REG' + data.CandidateAssessmentData.RegistrationId + '_TheoryId.png';
            data.CandidateAssessmentData.TheoryAssessment.IdentityImage.TimeStamp = moment().format('DD-MMM-YYYY h:mm:ss a');
            ImageArrayObj_Id = {
                FileName: 'REG' + data.CandidateAssessmentData.RegistrationId + '_TheoryId.png',
                Image_Data: this.webcamImage2.imageAsDataUrl
            };
            //ImageArrayContent.ImageArray.push(ImageArrayObj_Id);
            this.Uploadfiles(ImageArrayObj_start);
            this.Uploadfiles(ImageArrayObj_Id);
            //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                data.CandidateAssessmentData.TheoryAssessment.StartImage.Latitude = lat;
                data.CandidateAssessmentData.TheoryAssessment.StartImage.Longitude = long;
                data.CandidateAssessmentData.TheoryAssessment.IdentityImage.Latitude = lat;
                data.CandidateAssessmentData.TheoryAssessment.IdentityImage.Longitude = long;
                localStorage.setItem('lat', lat);
                localStorage.setItem('long', long);
                data.CandidateAssessmentData.TheoryAssessment.AssessmentEvents.push({
                    DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                    SubTypeId: 24,
                    Latitude: lat,
                    Longitude: long
                });
                localStorage.setItem(Req + '_' + Id + '_' + 'data', JSON.stringify(data));
                route.navigate(['theory-instructions']);
            });
        }
        else if (this.sub == 'practical') {
            data.CandidateAssessmentData.PracticalAssessment.StartImage.FileName =
                'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_PracticalStart.png';
            data.CandidateAssessmentData.PracticalAssessment.StartImage.TimeStamp = moment().format('DD-MMM-YYYY h:mm:ss a');
            ImageArrayObj_start = {
                FileName: 'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_PracticalStart.png',
                Image_Data: this.webcamImage1.imageAsDataUrl
            };
            ImageArrayContent.ImageArray.push(ImageArrayObj_start);
            data.CandidateAssessmentData.PracticalAssessment.IdentityImage.FileName =
                'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_PracticalId.png';
            data.CandidateAssessmentData.PracticalAssessment.IdentityImage.TimeStamp = moment().format('DD-MMM-YYYY h:mm:ss a');
            ImageArrayObj_Id = {
                FileName: 'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_PracticalId.png',
                Image_Data: this.webcamImage2.imageAsDataUrl
            };
            //ImageArrayContent.ImageArray.push(ImageArrayObj_Id);
            this.Uploadfiles(ImageArrayObj_start);
            this.Uploadfiles(ImageArrayObj_Id);
            //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                data.CandidateAssessmentData.PracticalAssessment.StartImage.Latitude = lat;
                data.CandidateAssessmentData.PracticalAssessment.StartImage.Longitude = long;
                data.CandidateAssessmentData.PracticalAssessment.IdentityImage.Latitude = lat;
                data.CandidateAssessmentData.PracticalAssessment.IdentityImage.Longitude = long;
                localStorage.setItem('lat', lat);
                localStorage.setItem('long', long);
                data.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push({
                    DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                    SubTypeId: 24,
                    Latitude: lat,
                    Longitude: long
                });
                localStorage.setItem(Req + '_' + Id + '_' + 'data', JSON.stringify(data));
                route.navigate(['practical-instructions']);
            });
        }
        else if (this.sub == 'viva') {
            data.CandidateAssessmentData.VivaMcqAssessment.StartImage.FileName =
                'REG' + data.CandidateAssessmentData.RegistrationId + '_VivaMcqStart.png';
            data.CandidateAssessmentData.VivaMcqAssessment.StartImage.TimeStamp = moment().format('DD-MMM-YYYY h:mm:ss a');
            ImageArrayObj_start = {
                FileName: 'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_VivaMcqStart.png',
                Image_Data: this.webcamImage1.imageAsDataUrl
            };
            ImageArrayContent.ImageArray.push(ImageArrayObj_start);
            data.CandidateAssessmentData.VivaMcqAssessment.IdentityImage.FileName =
                'REG' + data.CandidateAssessmentData.RegistrationId + '_VivaMcqId.png';
            data.CandidateAssessmentData.VivaMcqAssessment.IdentityImage.TimeStamp = moment().format('DD-MMM-YYYY h:mm:ss a');
            ImageArrayObj_Id = {
                FileName: 'REG' + data.CandidateAssessmentData.RegistrationId + '_VivaMcqId.png',
                Image_Data: this.webcamImage2.imageAsDataUrl
            };
            //ImageArrayContent.ImageArray.push(ImageArrayObj_Id);
            this.Uploadfiles(ImageArrayObj_start);
            this.Uploadfiles(ImageArrayObj_Id);
            //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                data.CandidateAssessmentData.VivaMcqAssessment.StartImage.Latitude = lat;
                data.CandidateAssessmentData.VivaMcqAssessment.StartImage.Longitude = long;
                data.CandidateAssessmentData.VivaMcqAssessment.IdentityImage.Latitude = lat;
                data.CandidateAssessmentData.VivaMcqAssessment.IdentityImage.Longitude = long;
                localStorage.setItem('lat', lat);
                localStorage.setItem('long', long);
                data.CandidateAssessmentData.VivaMcqAssessment.AssessmentEvents.push({
                    DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                    SubTypeId: 24,
                    Latitude: lat,
                    Longitude: long
                });
                localStorage.setItem(Req + '_' + Id + '_' + 'data', JSON.stringify(data));
                route.navigate(['viva-instructions']);
            });
        }
    };
    ImageCaptureComponent.prototype.Uploadfiles = function (ImageArrayContent) {
        $('#frmImages').append('<input name="image_data" value="' + ImageArrayContent.Image_Data + '">');
        $('#frmImages').append('<input name="image_file_name" value="' +
            ImageArrayContent.FileName +
            '">');
        var varForm = document.getElementById('frmImages');
        $.ajax({
            url: environment_1.environment.Upload_files_URL,
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
            }
        });
    };
    ImageCaptureComponent.prototype.ngOnDestroy = function () {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        document
            .getElementById('webcam')
            .parentNode.removeChild(document.getElementById('webcam'));
    };
    ImageCaptureComponent = __decorate([
        core_1.Component({
            selector: 'app-image-capture',
            templateUrl: './image-capture.component.html',
            styleUrls: ['./image-capture.component.css']
        })
    ], ImageCaptureComponent);
    return ImageCaptureComponent;
}());
exports.ImageCaptureComponent = ImageCaptureComponent;
