import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ZmatSelectOneSchema } from './zmat-select-one.schema';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'zmat-select-one',
  templateUrl: './zmat-select-one.component.html',
  styleUrls: ['./zmat-select-one.component.css']
})
export class ZmatSelectOneComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();

  @Input() schema: ZmatSelectOneSchema;

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
