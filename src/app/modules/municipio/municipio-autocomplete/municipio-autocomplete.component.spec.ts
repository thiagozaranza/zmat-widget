import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioAutocompleteComponent } from './municipio-autocomplete.component';

describe('MunicipioAutocompleteComponent', () => {
  let component: MunicipioAutocompleteComponent;
  let fixture: ComponentFixture<MunicipioAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipioAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
