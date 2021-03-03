import { CustomDateMonthFormat, DatepickerMonthComponent } from './datepicker-month/datepicker-month.component';
import { CustomDateYearFormat, DatepickerYearComponent } from './datepicker-year/datepicker-year.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DatepickerDayComponent } from './datepicker-day/datepicker-day.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    DatepickerDayComponent,
    DatepickerMonthComponent,
    DatepickerYearComponent,
    CustomDateMonthFormat,
    CustomDateYearFormat
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule
  ],
  exports: [
    DatepickerDayComponent,
    DatepickerMonthComponent,
    DatepickerYearComponent
  ]
})
export class DatepickerModule { }
