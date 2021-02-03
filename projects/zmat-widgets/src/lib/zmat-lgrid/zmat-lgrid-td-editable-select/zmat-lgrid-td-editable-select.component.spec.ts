import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatLGridTdEditableSelectComponent } from './zmat-lgrid-td-editable-select.component';

describe('ZmatLgridTdEditableSelectComponent', () => {
  let component: ZmatLGridTdEditableSelectComponent;
  let fixture: ComponentFixture<ZmatLGridTdEditableSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZmatLGridTdEditableSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatLGridTdEditableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
