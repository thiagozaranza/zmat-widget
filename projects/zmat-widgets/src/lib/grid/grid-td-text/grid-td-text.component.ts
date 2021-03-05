import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { IGridCellRender, IGridColumnSchema } from '../grid.schema';

import { BehaviorSubject } from 'rxjs';
import { GridTableComponent } from '../grid-table/grid-table.component';
import { IModel } from '../../commons/service.schema';

@Component({
  selector: 'lib-grid-td-text',
  templateUrl: './grid-td-text.component.html',
  styleUrls: ['./grid-td-text.component.css']
})
export class GridTdTextComponent<T extends IModel> implements IGridCellRender<T> {

  @ViewChild('input', {static: false}) input: ElementRef;

  public value: string | number | boolean;
  schema: IGridColumnSchema<T>;
  data: T;

  public $editing = new BehaviorSubject<boolean>(false);

  public saving = false;
  public error = false;
  public success = false;

  private editableInput;

  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;

  constructor(public parent: GridTableComponent<T>){
    this.$editing.subscribe(value => {
      if (value) {
        this.error = false;
        this.success = false;
        this.value = (this.data) ? this.schema.getData(this.data) : '';
        const interval = setInterval(() => {
          try{
            this.editableInput = document.getElementById('_input');
            this.editableInput.focus();
          } catch {}
        }, 100);
      }
    });
  }

  public editingMode(): void {
    if (this.schema.editable) {
      this.$editing.next(true);
    }
  }

  noEditingMode(): void {
    this.$editing.next(false);
  }

  public doRequest(): void
  {
    if (this.schema.getData(this.data) === this.value) {
      this.noEditingMode();
      return;
    }

    this.saving = true;

    const obj: object = {};

    obj[this.schema.field] = this.value;

    this.parent.schema.service.patch(obj).subscribe(
      res => {
        this.error = false;
        this.success = true;
        this.data = res;
        this.noEditingMode();
      },
      err => {
        this.saving = false;
        this.error = true;
        this.success = false;

        console.log(err);
      },
      () => this.saving = false
    );
  }

  getNumberValue(): number {
    return parseFloat(this.schema?.getData(this.data));
  }
}
