import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatDatepickerMonthComponent } from './zmat-datepicker-month.component';

describe('ZmatDatepickerMonthComponent', () => {
  let component: ZmatDatepickerMonthComponent;
  let fixture: ComponentFixture<ZmatDatepickerMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmatDatepickerMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatDatepickerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
