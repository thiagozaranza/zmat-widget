import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioService } from '../municipio.service';
import { MunicipioTableComponent } from './municipio-table.component';

describe('MunicipioTableComponent', () => {
  let component: MunicipioTableComponent;
  let fixture: ComponentFixture<MunicipioTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MunicipioTableComponent
      ],
      providers: [
        MunicipioService
      ]
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
