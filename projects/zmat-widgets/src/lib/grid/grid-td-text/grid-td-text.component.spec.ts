import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { GridTdTextComponent } from './grid-td-text.component';

describe('LazyGridTdTextComponent', () => {
  let component: GridTdTextComponent;
  let fixture: ComponentFixture<GridTdTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridTdTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTdTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
