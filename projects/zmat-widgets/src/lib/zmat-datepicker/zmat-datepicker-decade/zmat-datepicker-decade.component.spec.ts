import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatDatepickerDecadeComponent } from './zmat-datepicker-decade.component';

describe('ZmatDatepickerDecadeComponent', () => {
  let component: ZmatDatepickerDecadeComponent;
  let fixture: ComponentFixture<ZmatDatepickerDecadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmatDatepickerDecadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatDatepickerDecadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
