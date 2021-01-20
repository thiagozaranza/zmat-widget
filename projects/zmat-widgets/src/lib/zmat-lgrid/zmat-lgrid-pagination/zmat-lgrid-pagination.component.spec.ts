import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatLGridPaginationComponent } from './zmat-lgrid-pagination.component';

describe('LazyGridPaginationComponent', () => {
  let component: ZmatLGridPaginationComponent;
  let fixture: ComponentFixture<ZmatLGridPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmatLGridPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatLGridPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
