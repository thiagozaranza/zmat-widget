import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';

import * as _moment from 'moment';
import { Moment } from 'moment';
import { FormControl } from '@angular/forms';
import { getDefaultZmatDatepickerSchema, ZmatDatepickerSchema } from '../zmat-datepicker.schema';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

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
  selector: 'zmat-datepicker-day',
  templateUrl: './zmat-datepicker-day.component.html',
  styleUrls: ['./zmat-datepicker-day.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: _DAY_FORMAT},
  ]
})
export class ZmatDatepickerDayComponent implements OnInit {

  public date = new FormControl();

  @Input() schema: ZmatDatepickerSchema;
  @Output() selected: EventEmitter<Moment> = new EventEmitter();

  constructor() 
  {     
    if (!this.schema)
      this.schema = getDefaultZmatDatepickerSchema();
  }

  ngOnInit() 
  {    
    if (this.schema.value)
      this.date.setValue(this.schema.value);
  }

  keyUp(event: KeyboardEvent) 
  {
    event.preventDefault();

    if (event.keyCode == 13) 
        this.selected.emit(moment(this.date.value));
  }

  chosenDayHandler(event, datepicker: MatDatepicker<Moment>) 
  {
    const ctrlValue: Moment = this.date.value;
    let normalizedDay = event.value;

    if (!ctrlValue || !normalizedDay) return;
    
    ctrlValue.date(normalizedDay.date());
    this.date.setValue(ctrlValue);

    datepicker.close();

    this.selected.emit(ctrlValue);    
  }
}