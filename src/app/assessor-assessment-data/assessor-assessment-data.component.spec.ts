import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorAssessmentDataComponent } from './assessor-assessment-data.component';

describe('AssessorAssessmentDataComponent', () => {
  let component: AssessorAssessmentDataComponent;
  let fixture: ComponentFixture<AssessorAssessmentDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessorAssessmentDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessorAssessmentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
