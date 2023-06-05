import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusMaintenanceCostComponent } from './bus-maintenance-cost.component';

describe('PlatformBalancePieChartComponent', () => {
  let component: BusMaintenanceCostComponent;
  let fixture: ComponentFixture<BusMaintenanceCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusMaintenanceCostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusMaintenanceCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
