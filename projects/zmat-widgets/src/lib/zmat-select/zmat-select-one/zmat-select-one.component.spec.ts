import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatSelectOneComponent } from './zmat-select-one.component';

describe('ZmatSelectOneComponent', () => {
  let component: ZmatSelectOneComponent;
  let fixture: ComponentFixture<ZmatSelectOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmatSelectOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatSelectOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
