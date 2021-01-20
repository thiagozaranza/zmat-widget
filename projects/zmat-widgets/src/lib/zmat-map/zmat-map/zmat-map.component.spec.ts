import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatMapComponent } from './zmat-map.component';

describe('ZmatMapComponent', () => {
  let component: ZmatMapComponent;
  let fixture: ComponentFixture<ZmatMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmatMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
