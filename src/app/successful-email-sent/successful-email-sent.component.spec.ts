import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulEmailSentComponent } from './successful-email-sent.component';

describe('SuccessfulEmailSentComponent', () => {
  let component: SuccessfulEmailSentComponent;
  let fixture: ComponentFixture<SuccessfulEmailSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulEmailSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulEmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
