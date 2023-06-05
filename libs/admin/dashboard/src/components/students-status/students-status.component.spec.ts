import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsStatusComponent } from './students-status.component';

describe('StudentsStatusComponent', () => {
  let component: StudentsStatusComponent;
  let fixture: ComponentFixture<StudentsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
