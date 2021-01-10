import { ProctorAttributesComponent } from "./proctor-attributes/proctor-attributes.component";
import { ChangePasswordSuccessComponent } from "./change-password-success/change-password-success.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { VivaAssessmentComponent } from "./viva-assessment/viva-assessment.component";
import { SubmitResponseComponent } from "./submit-response/submit-response.component";
import { PracticalAssessmentComponent } from "./practical-assessment/practical-assessment.component";
import { FeedbackVivaComponent } from "./feedback-viva/feedback-viva.component";
import { FeedbackPracticalComponent } from "./feedback-practical/feedback-practical.component";
import { EndImageCaptureComponent } from "./end-image-capture/end-image-capture.component";
import { TheoryAssessmentComponent } from "./theory-assessment/theory-assessment.component";
import { ImageCaptureComponent } from "./image-capture/image-capture.component";
import { TheoryInstructionsComponent } from "./theory-instructions/theory-instructions.component";
import { PracticalInstructionsComponent } from "./practical-instructions/practical-instructions.component";
import { VivaInstructionsComponent } from "./viva-instructions/viva-instructions.component";
import { FeedbackTheoryComponent } from "./feedback-theory/feedback-theory.component";
import { GeneralInstructionsComponent } from "./general-instructions/general-instructions.component";
import { LoginComponent } from "./login/login.component";
import { AssessmentDetailComponent } from "./assessment-detail/assessment-detail.component";
import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './auth/auth.guard';
import { ProctorCountViewsComponent } from "./proctor-count-views/proctor-count-views.component";

import { HomeComponent } from './home/home.component';
import { JobRoleComponent } from './job-role/job-role.component';
import { AssessorDetailsComponent } from './assessor-details/assessor-details.component';
import { BatchesComponent } from './batches/batches.component';
import { TodaysBatchesComponent } from './todays-batches/todays-batches.component';
import { PassedBatchesComponent } from './passed-batches/passed-batches.component';
import { UpcomingBatchesComponent } from './upcoming-batches/upcoming-batches.component';
import { PendingEvaluationComponent } from './pending-evaluation/pending-evaluation.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { AssessmentEvaluationComponent } from './assessment-evaluation/assessment-evaluation.component';
import { AssessorDashboardComponent } from './assessor-dashboard/assessor-dashboard.component';
import { AssessorAssessmentDataComponent } from './assessor-assessment-data/assessor-assessment-data.component';
import { CandidateGradesComponent } from './candidate-grades/candidate-grades.component';





import { BillsComponent } from './bills/bills.component';
import { ReportsComponent } from './reports/reports.component';



export const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "assessment-details", component: AssessmentDetailComponent },
  { path: "general-instructions", component: GeneralInstructionsComponent },
  { path: "theory-instructions", component: TheoryInstructionsComponent },
  { path: "practical-instructions", component: PracticalInstructionsComponent },
  { path: "viva-instructions", component: VivaInstructionsComponent },
  { path: "image-capture", component: ImageCaptureComponent },
  { path: "theory-assessment", component: TheoryAssessmentComponent },
  { path: "practical-assessment", component: PracticalAssessmentComponent },
  { path: "end-image-capture", component: EndImageCaptureComponent },
  { path: "feedback-theory", component: FeedbackTheoryComponent },
  { path: "feedback-practical", component: FeedbackPracticalComponent },
  { path: "feedback-viva", component: FeedbackVivaComponent },
  { path: "submit-response", component: SubmitResponseComponent },
  { path: "viva-assessment", component: VivaAssessmentComponent },
  { path: "proctor-count-views", component: ProctorCountViewsComponent,canActivate:[AuthGuard] },
  { path: "changepassword", component: ChangePasswordComponent,canActivate:[AuthGuard] },
  { path: "proctor-attributes", component: ProctorAttributesComponent,canActivate:[AuthGuard] },
  {
    path: "password_changed_successfully",
    component: ChangePasswordSuccessComponent,
    canActivate:[AuthGuard]
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },



  {path : 'home', component:HomeComponent},
  {path : 'QualificationPackCandidateDetails', component: JobRoleComponent, canActivate:[AuthGuard]},
  {path : 'QualificationPackCandidateDetails/:id', component: JobRoleComponent, canActivate:[AuthGuard]},
  {path : 'AssessorCertificationDetails', component: AssessorDetailsComponent, canActivate:[AuthGuard]},
  {path : 'AssessorCertificationDetails/:id/:QpId/:SearchType', component: AssessorDetailsComponent, canActivate:[AuthGuard]},
  
  {path : 'batches', component: BatchesComponent},

  {path : 'todays_batches', component: TodaysBatchesComponent},
  {path : 'todays_batches/:id', component: TodaysBatchesComponent},
  {path : 'past_batches', component: PassedBatchesComponent},
  {path : 'past_batches/:id', component: PassedBatchesComponent},
  {path : 'upcoming_batches', component: UpcomingBatchesComponent},
  {path : 'upcoming_batches/:id', component: UpcomingBatchesComponent},

  {path : 'assessment_evaluation', component: PendingEvaluationComponent},
  {path : 'AssessmentEvaluationCandidateList', component: CandidateListComponent},
  {path : 'CandidateAssessmentEvaluation', component:AssessmentEvaluationComponent, },



  
  {path : 'bills', component: BillsComponent, },
  {path : 'reports', component: ReportsComponent, },



  {path : 'AssessorDetails', component: AssessorDashboardComponent,},
  {path : 'AssessorAssessmentData', component: AssessorAssessmentDataComponent, },
  {path : 'AssessmentGradebook', component: CandidateGradesComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  LoginComponent,
  AssessmentDetailComponent,
  GeneralInstructionsComponent,
  TheoryInstructionsComponent,
  PracticalInstructionsComponent,
  VivaInstructionsComponent,
  ImageCaptureComponent,
  TheoryAssessmentComponent,
  PracticalAssessmentComponent,
  EndImageCaptureComponent,
  FeedbackTheoryComponent,
  FeedbackPracticalComponent,
  FeedbackVivaComponent,
  SubmitResponseComponent,
  VivaAssessmentComponent,
  ProctorCountViewsComponent,
  ChangePasswordComponent,
  ChangePasswordSuccessComponent,
  ProctorAttributesComponent,
];
