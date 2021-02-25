import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { MatSelect } from '@angular/material/select';
import { SelectOneSchema } from './select-one.schema';

@Component({
  selector: 'lib-select-one',
  templateUrl: './select-one.component.html',
  styleUrls: ['./select-one.component.css']
})
export class SelectOneComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();

  @Input() schema: SelectOneSchema;

  private _data = new BehaviorSubject<any[]>([]);

  @Input()
  set data(value) {
    this._data.next(value.filter(item => item && item.id));
  };

  get data() {
    return this._data.getValue();
  }

  private _value = new BehaviorSubject<any>({});

  @Input()
  set value(value) {
    this._value.next(value);
  };

  get value() {
    return this._value.getValue();
  }

  @Output() changed: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatSelect, {static: true}) select: MatSelect;

  constructor() { }

  public itemChanged(event)
  {
    this.changed.emit(event.value);
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    this._value.subscribe(value => this.select.value = (value)? value.id: null)
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
