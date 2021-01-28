import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorDetailsComponent } from './assessor-details.component';

describe('AssessorDetailsComponent', () => {
  let component: AssessorDetailsComponent;
  let fixture: ComponentFixture<AssessorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
