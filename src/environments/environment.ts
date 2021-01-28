// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_authentication_email:
    "https://uap-demo-api.certiplate.com/json/asynconeway/GetAuthenticationResponseDataRequest",
  ClientIP: "127.0.0.1",
  ClientBrowser: "MozillaFirefox",
  ApiKey: "ddcd795c-1051-4bc6-8b31-c5b60b68544c",
  URL_logout_authentication:
    "https://uap-demo-api.certiplate.com/json/asynconeway/GetLogoutResponseDataRequest",
  URL_send_mail:
    "https://uap-demo-api.certiplate.com/json/asynconeway/SendForgotPasswordMailRequest",
  URL_reset_password:
    "https://uap-demo-api.certiplate.com/json/asynconeway/GetResetPasswordResponseDataRequest",
  URL_sectorwise_details:
    "https://uap-demo-api.certiplate.com/json/asynconeway/GetSectorwiseAssessorCertificationStatusCountDataRequest",
  URL_QPwise_details:
    "https://uap-demo-api.certiplate.com/json/asynconeway/GetQPwiseAssessorCertificationStatusCountDataRequest",
  URL_assessor_cert_details:
    "http://uap-demo-api.certiplate.com/json/asynconeway/GetAssessorCertificationDetailedDataRequest",
  URL_change_password:
    "https://uap-demo-api.certiplate.com/json/asynconeway/ChangeUserPasswordRequest",

  URL_statewise_detail : 'https://uap-demo-api.certiplate.com/json/asynconeway/GetStatewiseAssessorCountDataRequest',



  URL_assessor_assessment_data : ' https://uap-demo-api.certiplate.com/json/asynconeway/GetAssessorAssessmentDataRequest',
  URL_assessment_candidate_data : 'https://uap-demo-api.certiplate.com/json/asynconeway/GetAssessmentCandidateDataRequest',
  URL_assessment_evaluation_data : 'https://uap-demo-api.certiplate.com//json/asynconeway/GetPracticalAssessmentEvaluationDataRequest',
  URL_GetCandidateAssessmentImageData : 'https://uap-demo-api.certiplate.com//json/asynconeway/GetCandidateAssessmentImageDataRequest',
  URL_GetCandidateAssessmentVideoData : 'https://uap-demo-api.certiplate.com//json/asynconeway/GetCandidateAssessmentVideoDataRequest',
  URL_GetCandidateAssessmentEventData : 'https://uap-demo-api.certiplate.com//json/asynconeway/GetCandidateAssessmentEventDataRequest',
  URL_GetCandidateAssessmentSystemInfoData : 'https://uap-demo-api.certiplate.com//json/asynconeway/GetCandidateAssessmentSystemInfoDataRequest',
  URL_SubmitPracticalAssessment : 'https://uap-demo-api.certiplate.com//json/asynconeway/SubmitPracticalAssessmentEvaluationDataRequest',


  URL_AssessorDashBoard : 'https://uap-demo-api.certiplate.com/json/asynconeway/GetAssessorDashboardDataRequest',
  URL_AssessorDashboardCandidateData : 'https://uap-demo-api.certiplate.com/json/asynconeway/GetAssessorDashboardCandidateDataRequest',
  URL_GetPCWiseGrade : 'https://uap-demo-api.certiplate.com/json/asynconeway/GetPCwiseGradeDataRequest',


  
  image_url_fileserver : 'https://fileserver.certiplate.com/NavritiTabAssessments_Demo/assessmentvideos/',
  image_url_certiplate : 'https://uap-demo.certiplate.com/Data/CandidateData/AssessmentResponses/',
 

  URL_authentication:
    "https://uap-demo-api.certiplate.com/json/asynconeway/GetCandidateAssessmentAuthenticationRequest",
  URL_datarequest:
    "https://uap-demo-api.certiplate.com/json/asynconeway/GetCandidateAssessmentDataRequest",
  api_key: "d353dd24-8612-4d56-a6df-e3b2f10b932f",
  Theory_TutorialVideo_URL: "https://www.w3schools.com/html/mov_bbb.mp4",
  Practical_TutorialVideo_URL: "https://www.w3schools.com/html/mov_bbb.mp4",
  Question_Image_URL:
    "https://uap-demo.certiplate.com/Data/QB/Question/Original/",
  Option_Image_URL:
    "https://uap-demo.certiplate.com/Data/QB/OptionsImage/Original/",
  Viva_TutorialVideo_URL: "https://www.w3schools.com/html/mov_bbb.mp4",
  Upload_files_URL:
    "https://uap-demo.certiplate.com/api/UploadCandidateOnlineAssessmentFile.php",
  Submit_Responsedata_URL:
    "https://uap-demo-api.certiplate.com/json/asynconeway/SubmitCandidateAssessmentDataRequest",
  Proctor_Count_Views_URL:
    "https://uap-demo-api.certiplate.com/json/asynconeway/GetStateAndLanguagewiseProctorCountDataRequest",
  Proctor_Count_Views_Api_Key: "ddcd795c-1051-4bc6-8b31-c5b60b68544c",
  Proctor_Attributes_URL:
    "https://uap-demo-api.certiplate.com/json/asynconeway/GetStateAndLanguagewiseProctorDetailedDataRequest",
  Proctor_Attributes_Api_Key: "ddcd795c-1051-4bc6-8b31-c5b60b68544c",
  Violation_Api:
    "https://uap-demo-api.certiplate.com/json/asynconeway/NotifyAssessmentViolationRequest",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
