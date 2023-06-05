import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnTimePerformaceComponent } from './on-time-performace.component';

describe('OnTimePerformaceComponent', () => {
  let component: OnTimePerformaceComponent;
  let fixture: ComponentFixture<OnTimePerformaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnTimePerformaceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnTimePerformaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
