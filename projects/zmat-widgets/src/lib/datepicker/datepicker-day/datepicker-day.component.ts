import * as _moment from 'moment';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { IDatepickerSchema, defaultDatepickerSchema } from '../datepicker.schema';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';

const moment = _moment;

export const _DAY_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@Component({
  selector: 'datepicker-day',
  templateUrl: './datepicker-day.component.html',
  styleUrls: ['./datepicker-day.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: _DAY_FORMAT},
  ]
})
export class DatepickerDayComponent implements OnInit {

  public date = new FormControl();

  @Input() schema: IDatepickerSchema;
  @Output() selected: EventEmitter<Moment> = new EventEmitter();

  constructor()
  {
    if (!this.schema) {
      this.schema = defaultDatepickerSchema;
    }
  }

  ngOnInit(): void
  {
    if (this.schema.value) {
      this.date.setValue(this.schema.value);
    }
  }

  keyUp(event: KeyboardEvent): void
  {
    event.preventDefault();

    if (event.key === 'Enter') {
      this.selected.emit(moment(this.date.value));
    }
  }

  chosenDayHandler(event, datepicker: MatDatepicker<Moment>): void
  {
    const ctrlValue: Moment = this.date.value;
    const normalizedDay = event.value;

    if (!ctrlValue || !normalizedDay) {
      return;
    }

    ctrlValue.date(normalizedDay.date());
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
