import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { GridTdActionComponent } from './grid-td-action.component';

describe('LazyGridTdActionComponent', () => {
  let component: GridTdActionComponent;
  let fixture: ComponentFixture<GridTdActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridTdActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTdActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
