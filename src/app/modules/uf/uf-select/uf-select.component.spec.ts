import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfSelectComponent } from './uf-select.component';

describe('UfSelectComponent', () => {
  let component: UfSelectComponent;
  let fixture: ComponentFixture<UfSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UfSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UfSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
