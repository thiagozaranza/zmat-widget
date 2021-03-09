import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';

import { IModel } from '../../commons/service.schema';
import { ISelectOneSchema } from './select-one.schema';

@Component({
  selector: 'lib-select-one',
  templateUrl: './select-one.component.html',
  styleUrls: ['./select-one.component.css']
})
export class SelectOneComponent<T extends IModel> implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  @Input() schema: ISelectOneSchema;

  private aData = new BehaviorSubject<T[]>([]);

  @Input()
  set data(value) {
    this.aData.next(value.filter(item => item && item.getId()));
  }

  get data(): T[] {
    return this.aData.getValue();
  }

  private aValue = new BehaviorSubject<T>(null);

  @Input()
  set value(value) {
    this.aValue.next(value);
  }

  get value(): T {
    return this.aValue.getValue();
  }

  @Output() selected: EventEmitter<T> = new EventEmitter();

  @ViewChild(MatSelect, {static: true}) select: MatSelect;

  constructor() { }

  public itemSelected(event: MatSelectChange): void
  {
    const value: T = this.data.find(item => item.getId() === event.value);

    this.schema.formGroup?.get(this.schema.formControlName).setValue(value.getId());
    this.selected.emit(value);
  }

  ngOnInit(): void {
    this.aValue.subscribe(value => this.select.value = (value) ? value.getId() : null);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
