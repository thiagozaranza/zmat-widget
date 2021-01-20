import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatLGridTdActionComponent } from './zmat-lgrid-td-action.component';

describe('LazyGridTdActionComponent', () => {
  let component: ZmatLGridTdActionComponent;
  let fixture: ComponentFixture<ZmatLGridTdActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmatLGridTdActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatLGridTdActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
