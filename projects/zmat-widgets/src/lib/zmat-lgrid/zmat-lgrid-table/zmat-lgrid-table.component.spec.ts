import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatLGridTableComponent } from './zmat-lgrid-table.component';

describe('LazyGridTableComponent', () => {
  let component: ZmatLGridTableComponent;
  let fixture: ComponentFixture<ZmatLGridTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmatLGridTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatLGridTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
