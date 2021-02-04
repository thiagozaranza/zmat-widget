import { CPF_CNPJMask, currencyMask } from '../zmat-lgrid-masks';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { IZmatLGridColumnSchema, ZmatLGridInputMaskType } from '../zmat-lgrid.schema';

import { ZmatLGridTableComponent } from '../zmat-lgrid-table/zmat-lgrid-table.component';

@Component({
  selector: 'lib-zmat-lgrid-td-text',
  templateUrl: './zmat-lgrid-td-text.component.html',
  styleUrls: ['./zmat-lgrid-td-text.component.css']
})
export class ZmatLGridTdTextComponent {

  public text: string = '';

  public editing = false;
  public saving = false;
  public error = false;
  public success = false;

  private editableInput;

  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;

  model: IZmatLGridColumnSchema;
  data: any;

  constructor(private parent:ZmatLGridTableComponent){

  }

  public editMode(): void {

    if (!this.model.editInPlace) {
      return;
    }

    this.editing = true;
    this.error = false;
    this.success = false;

    const interval = setInterval (() => {
      try {
        this.editableInput = document.getElementById('editableInput');
        this.applyMask(this.editableInput);
        this.editableInput.value = (this.data)? this.model.getData(this.data) : '';
        this.editableInput.focus();

        clearInterval(interval);
      } catch {}
    }, 100);
  }

  private applyMask(input) {
    switch(this.model.mask) {
      case ZmatLGridInputMaskType.CURRENCY:
        currencyMask(input);
        break;
      case ZmatLGridInputMaskType.CPF_CNPJ:
        CPF_CNPJMask(input);
        break;
    }
  }

  public doRequest(value)
  {
    if (this.model.getData(this.data) == value) {
      this.editing = false;
      return;
    }

    this.saving = true;

    let obj = {};
    obj[this.model.field] = value;

    this.parent.schema.service.pick(obj).subscribe(
      res => {
        this.error = false;
        this.success = true;
        this.data = obj;
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
