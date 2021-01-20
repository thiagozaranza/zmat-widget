import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatDatepickerDayComponent } from './zmat-datepicker-day.component';

describe('ZmatDatepickerDayComponent', () => {
  let component: ZmatDatepickerDayComponent;
  let fixture: ComponentFixture<ZmatDatepickerDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmatDatepickerDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatDatepickerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
