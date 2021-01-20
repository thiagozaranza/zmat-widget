import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatLGridTdBoolComponent } from './zmat-lgrid-td-bool.component';

describe('LazyGridTdBoolComponent', () => {
  let component: ZmatLGridTdBoolComponent;
  let fixture: ComponentFixture<ZmatLGridTdBoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmatLGridTdBoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatLGridTdBoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
