import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositWithdrawalAnalyticsComponent } from './deposit-withdrawal-analytics.component';

describe('OnTimePerformaceComponent', () => {
  let component: DepositWithdrawalAnalyticsComponent;
  let fixture: ComponentFixture<DepositWithdrawalAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositWithdrawalAnalyticsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DepositWithdrawalAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
