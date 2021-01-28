import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysBatchesComponent } from './todays-batches.component';

describe('TodaysBatchesComponent', () => {
  let component: TodaysBatchesComponent;
  let fixture: ComponentFixture<TodaysBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysBatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
