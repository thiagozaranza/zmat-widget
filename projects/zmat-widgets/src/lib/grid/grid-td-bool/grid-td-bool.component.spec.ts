import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { GridTdBoolComponent } from './grid-td-bool.component';

describe('LazyGridTdBoolComponent', () => {
  let component: GridTdBoolComponent;
  let fixture: ComponentFixture<GridTdBoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridTdBoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTdBoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
