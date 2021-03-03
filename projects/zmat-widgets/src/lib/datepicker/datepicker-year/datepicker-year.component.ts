import * as moment from 'moment';

import { Component, Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { IDatepickerSchema, defaultDatepickerSchema } from '../datepicker.schema';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';

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
  selector: 'datepicker-year',
  templateUrl: './datepicker-year.component.html',
  styleUrls: ['./datepicker-year.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: _YEAR_FORMAT},
  ]
})
export class DatepickerYearComponent implements OnInit {

  public date = new FormControl();

  @Input() schema: IDatepickerSchema;
  @Output() selected: EventEmitter<Moment> = new EventEmitter();

  constructor() {
    if (!this.schema) {
      this.schema = defaultDatepickerSchema;
    }
  }

  ngOnInit(): void {
    if (this.schema.value) {
      this.date.setValue(moment(this.schema.value));
    }
  }

  keyUp(event: KeyboardEvent): void
  {
    event.preventDefault();

    if (event.key === 'Enter') {
      this.selected.emit(this.date.value);
    }
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>): void
  {
    let ctrlValue = this.date.value;

    if (!ctrlValue) {
      ctrlValue = moment();
    }

    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);

    datepicker.close();

    this.selected.emit(ctrlValue);
  }

  getPanelClasses(): string {
    let classes = [];

    if (!this.schema.panelClass) {
      return;
    }

    if (typeof this.schema.panelClass === 'string') {
      classes.push(this.schema.panelClass);
    } else {
      classes = this.schema.panelClass;
    }

    console.log(classes.join(' '));

    return classes.join(' ');
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

