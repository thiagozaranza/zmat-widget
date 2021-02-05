import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { IZmatLGridColumnSchema } from '../zmat-lgrid.schema';
import { MatInput } from '@angular/material/input';
import { ZmatLGridTableComponent } from '../zmat-lgrid-table/zmat-lgrid-table.component';

@Component({
  selector: 'lib-zmat-lgrid-td-text',
  templateUrl: './zmat-lgrid-td-text.component.html',
  styleUrls: ['./zmat-lgrid-td-text.component.css']
})
export class ZmatLGridTdTextComponent {

  @ViewChild('input', {static: false}) input: ElementRef;

  public value: number;

  public $editing = new BehaviorSubject<boolean>(false);

  public saving = false;
  public error = false;
  public success = false;

  private editableInput;

  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;

  model: IZmatLGridColumnSchema;
  data: any;

  constructor(private parent: ZmatLGridTableComponent){
    this.$editing.subscribe(value => {
      if (value) {
        this.error = false;
        this.success = false;
        this.value = (this.data) ? this.model.getData(this.data) : '';
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
    if (this.model.editable) {
      this.$editing.next(true);
    }
  }

  noEditingMode(): void {
    this.$editing.next(false);
  }

  public doRequest(): void
  {
    if (this.model.getData(this.data) === this.value) {
      this.noEditingMode();
      return;
    }

    this.saving = true;

    const obj = {};
    obj[this.model.field] = this.value;

    this.parent.schema.service.pick(obj).subscribe(
      res => {
        this.error = false;
        this.success = true;
        this.data = obj;
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
}
