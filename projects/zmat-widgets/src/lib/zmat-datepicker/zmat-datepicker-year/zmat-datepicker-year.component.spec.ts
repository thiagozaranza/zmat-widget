import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatDatepickerYearComponent } from './zmat-datepicker-year.component';

describe('ZmatDatepickerYearComponent', () => {
  let component: ZmatDatepickerYearComponent;
  let fixture: ComponentFixture<ZmatDatepickerYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmatDatepickerYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatDatepickerYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
