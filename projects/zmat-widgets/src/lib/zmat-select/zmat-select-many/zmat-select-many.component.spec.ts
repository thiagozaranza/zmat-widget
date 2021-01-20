import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatSelectManyComponent } from './zmat-select-many.component';

describe('ZmatSelectManyComponent', () => {
  let component: ZmatSelectManyComponent;
  let fixture: ComponentFixture<ZmatSelectManyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmatSelectManyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatSelectManyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
