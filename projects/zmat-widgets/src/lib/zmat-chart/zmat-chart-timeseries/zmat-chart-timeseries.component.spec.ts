import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmatChartTimeseriesComponent } from './zmat-chart-timeseries.component';

describe('ZmatChartLineComponent', () => {
  let component: ZmatChartTimeseriesComponent;
  let fixture: ComponentFixture<ZmatChartTimeseriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmatChartTimeseriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmatChartTimeseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
