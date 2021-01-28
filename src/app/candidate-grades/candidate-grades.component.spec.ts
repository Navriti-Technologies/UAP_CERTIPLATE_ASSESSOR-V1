import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateGradesComponent } from './candidate-grades.component';

describe('CandidateGradesComponent', () => {
  let component: CandidateGradesComponent;
  let fixture: ComponentFixture<CandidateGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateGradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
