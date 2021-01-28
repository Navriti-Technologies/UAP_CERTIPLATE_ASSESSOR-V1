import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassedBatchesComponent } from './passed-batches.component';

describe('PassedBatchesComponent', () => {
  let component: PassedBatchesComponent;
  let fixture: ComponentFixture<PassedBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassedBatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassedBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
