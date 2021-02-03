import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatLgridTdEditableTextComponent } from './zmat-lgrid-td-editable-text.component';

describe('ZmatLgridTdEditableTextComponent', () => {
  let component: ZmatLgridTdEditableTextComponent;
  let fixture: ComponentFixture<ZmatLgridTdEditableTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZmatLgridTdEditableTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatLgridTdEditableTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
