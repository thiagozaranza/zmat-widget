import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatLGridTdTextComponent } from './zmat-lgrid-td-text.component';

describe('LazyGridTdTextComponent', () => {
  let component: ZmatLGridTdTextComponent;
  let fixture: ComponentFixture<ZmatLGridTdTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmatLGridTdTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatLGridTdTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
