import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsStatusByBusComponent } from './students-status-by-bus.component';

describe('StudentsStatusComponent', () => {
  let component: StudentsStatusByBusComponent;
  let fixture: ComponentFixture<StudentsStatusByBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsStatusByBusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsStatusByBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
