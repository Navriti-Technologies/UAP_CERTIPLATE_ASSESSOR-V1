import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {WebcamModule} from 'ngx-webcam';
import {CountdownModule, CountdownComponent} from 'ngx-countdown';
import {MatRadioModule} from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {DataTablesModule} from 'angular-datatables';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { MatIconModule } from '@angular/material/icon';

// MDB Angular Free
import {
  CheckboxModule,
  WavesModule,
  ButtonsModule,
  InputsModule,
  IconsModule,
  CardsModule,
} from 'angular-bootstrap-md';

import {
  AppRoutingModule,
  routingComponents,
  routes,
} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { TheoryInstructionsComponent } from './theory-instructions/theory-instructions.component';
import { PracticalInstructionsComponent } from './practical-instructions/practical-instructions.component';
import { VivaInstructionsComponent } from './viva-instructions/viva-instructions.component';
import { ImageCaptureComponent } from './image-capture/image-capture.component';
import { TheoryAssessmentComponent } from './theory-assessment/theory-assessment.component';
import { EndImageCaptureComponent } from './end-image-capture/end-image-capture.component';
import { FeedbackTheoryComponent } from './feedback-theory/feedback-theory.component';
import { FeedbackPracticalComponent } from './feedback-practical/feedback-practical.component';
import { FeedbackVivaComponent } from './feedback-viva/feedback-viva.component';
import { PracticalAssessmentComponent } from './practical-assessment/practical-assessment.component';
import { SubmitResponseComponent } from './submit-response/submit-response.component';
import { VivaAssessmentComponent } from './viva-assessment/viva-assessment.component';
import { ProctorCountViewsComponent } from './proctor-count-views/proctor-count-views.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordSuccessComponent } from './change-password-success/change-password-success.component';
import { ProctorAttributesComponent } from './proctor-attributes/proctor-attributes.component';
import { HeaderComponent } from './header/header.component';
import { FootersComponent } from './footers/footers.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { JobRoleComponent } from './job-role/job-role.component';
import { AssessorDetailsComponent } from './assessor-details/assessor-details.component';

import { ExcelService } from './service/excel.service';
import { PassedBatchesComponent } from './passed-batches/passed-batches.component';
import { UpcomingBatchesComponent } from './upcoming-batches/upcoming-batches.component';
import { TodaysBatchesComponent } from './todays-batches/todays-batches.component';
import { BatchesComponent } from './batches/batches.component';
import { PendingEvaluationComponent } from './pending-evaluation/pending-evaluation.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { AssessmentEvaluationComponent } from './assessment-evaluation/assessment-evaluation.component';
import { AssessorDashboardComponent } from './assessor-dashboard/assessor-dashboard.component';
import { AssessorAssessmentDataComponent } from './assessor-assessment-data/assessor-assessment-data.component';
import { CandidateGradesComponent } from './candidate-grades/candidate-grades.component';
import { BillsComponent } from './bills/bills.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [AppComponent, routingComponents, NavBarComponent, FooterComponent, TheoryInstructionsComponent, PracticalInstructionsComponent, VivaInstructionsComponent, ImageCaptureComponent, TheoryAssessmentComponent, EndImageCaptureComponent, FeedbackTheoryComponent, FeedbackPracticalComponent, FeedbackVivaComponent, PracticalAssessmentComponent, SubmitResponseComponent, VivaAssessmentComponent, ProctorCountViewsComponent, ChangePasswordComponent, ChangePasswordSuccessComponent, ProctorAttributesComponent, HeaderComponent, FootersComponent, NavbarComponent, HomeComponent, JobRoleComponent, AssessorDetailsComponent, PassedBatchesComponent, UpcomingBatchesComponent, TodaysBatchesComponent, BatchesComponent, PendingEvaluationComponent, CandidateListComponent, AssessmentEvaluationComponent, AssessorDashboardComponent, AssessorAssessmentDataComponent, CandidateGradesComponent, BillsComponent, ReportsComponent],
  imports: [
    WebcamModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    MatButtonModule,
    BrowserAnimationsModule,
    CheckboxModule,
    MatRadioModule,
    WavesModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    CardsModule,
    CountdownModule,
    MatCardModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    BackButtonDisableModule.forRoot(),
    MDBBootstrapModule.forRoot(),
  ],
  exports: [BrowserAnimationsModule],
  providers: [CountdownComponent, ExcelService],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
