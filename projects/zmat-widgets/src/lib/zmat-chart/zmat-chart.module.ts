import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZmatChartTimeseriesComponent } from './zmat-chart-timeseries/zmat-chart-timeseries.component';

@NgModule({
  declarations: [
    ZmatChartTimeseriesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ZmatChartTimeseriesComponent
  ]
})
export class ZmatChartModule { }
