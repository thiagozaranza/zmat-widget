import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatLgridSearchComponent } from './zmat-lgrid-search.component';

describe('ZmatLgridSearchComponent', () => {
  let component: ZmatLgridSearchComponent;
  let fixture: ComponentFixture<ZmatLgridSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZmatLgridSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatLgridSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
