import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { GridTableComponent } from './grid-table.component';

describe('LazyGridTableComponent', () => {
  let component: GridTableComponent;
  let fixture: ComponentFixture<GridTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
