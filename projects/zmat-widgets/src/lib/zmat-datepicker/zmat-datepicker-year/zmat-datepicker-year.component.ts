import { Component, OnInit, Input, Output, EventEmitter, Directive } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ZmatDatepickerSchema, getDefaultZmatDatepickerSchema } from '../zmat-datepicker.schema';
import { Moment } from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

export const _YEAR_FORMAT = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@Component({
  selector: 'zmat-datepicker-year',
  templateUrl: './zmat-datepicker-year.component.html',
  styleUrls: ['./zmat-datepicker-year.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: _YEAR_FORMAT},
  ]
})
export class ZmatDatepickerYearComponent implements OnInit {

  public date = new FormControl();

  @Input() schema: ZmatDatepickerSchema;
  @Output() selected: EventEmitter<Moment> = new EventEmitter();

  constructor() { 
    if (!this.schema)
      this.schema = getDefaultZmatDatepickerSchema();
  }

  ngOnInit() {
    if (this.schema.value)
      this.date.setValue(moment(this.schema.value));
  }

  keyUp(event: KeyboardEvent) 
  {
    event.preventDefault();

    if (event.keyCode == 13) 
        this.selected.emit(this.date.value);
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) 
  {
    let ctrlValue = this.date.value;

    if (!ctrlValue) 
      ctrlValue = moment();

    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);

    datepicker.close();

    this.selected.emit(ctrlValue);
  }
}

@Directive({
  selector: '[dateFormatYear]',
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: _YEAR_FORMAT},
  ],
})
export class CustomDateYearFormat {
}

