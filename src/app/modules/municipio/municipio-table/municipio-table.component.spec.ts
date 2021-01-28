import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioTableComponent } from './municipio-table.component';

describe('MunicipioTableComponent', () => {
  let component: MunicipioTableComponent;
  let fixture: ComponentFixture<MunicipioTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipioTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
