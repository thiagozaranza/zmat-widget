import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { SelectManyComponent } from './select-many.component';

describe('SelectManyComponent', () => {
  let component: SelectManyComponent;
  let fixture: ComponentFixture<SelectManyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectManyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectManyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
