import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ZmatDatepickerDayComponent } from './zmat-datepicker-day/zmat-datepicker-day.component';
import { ZmatDatepickerMonthComponent, CustomDateMonthFormat } from './zmat-datepicker-month/zmat-datepicker-month.component';
import { ZmatDatepickerYearComponent, CustomDateYearFormat } from './zmat-datepicker-year/zmat-datepicker-year.component';
import { ZmatDatepickerDecadeComponent } from './zmat-datepicker-decade/zmat-datepicker-decade.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
  declarations: [
    ZmatDatepickerDayComponent, 
    ZmatDatepickerMonthComponent, 
    ZmatDatepickerYearComponent, 
    ZmatDatepickerDecadeComponent,
    CustomDateMonthFormat,
    CustomDateYearFormat
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  exports: [
    ZmatDatepickerDayComponent, 
    ZmatDatepickerMonthComponent, 
    ZmatDatepickerYearComponent, 
    ZmatDatepickerDecadeComponent
  ]
})
export class ZmatDatepickerModule { }
