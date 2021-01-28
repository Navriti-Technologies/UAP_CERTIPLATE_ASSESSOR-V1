import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingEvaluationComponent } from './pending-evaluation.component';

describe('PendingEvaluationComponent', () => {
  let component: PendingEvaluationComponent;
  let fixture: ComponentFixture<PendingEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
