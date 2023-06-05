import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelConsumptionComponent } from './fuel-consumption.component';

describe('FuelConsumptionComponent', () => {
  let component: FuelConsumptionComponent;
  let fixture: ComponentFixture<FuelConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelConsumptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FuelConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
