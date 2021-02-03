import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { ZmatLGridTableComponent } from '../zmat-lgrid-table/zmat-lgrid-table.component';

@Component({
  selector: 'lib-zmat-lgrid-td-editable-text',
  templateUrl: './zmat-lgrid-td-editable-text.component.html',
  styleUrls: ['./zmat-lgrid-td-editable-text.component.css']
})
export class ZmatLgridTdEditableTextComponent{

  public text: string = '';

  public editing = false;
  public saving = false;
  public error = false;
  public success = false;

  private editableInput;

  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;

  model: any;
  data: any;

  constructor(private parent:ZmatLGridTableComponent){
    console.log('ZmatLgridTdEditableTextComponent constructor()');

  }

  public editMode(): void {
    this.editing = true;
    const interval = setInterval (() => {
      try {
      this.editableInput = document.getElementById('editable-input');
      this.editableInput.value = (this.data)? this.model.getData(this.data) : '';
      this.editableInput.addEventListener ('blur', () => this.editing = false);
      this.editableInput.addEventListener ('keyup', (e) => {
        if (e.keyCode == 13) {
          let obj = {};
          obj[this.model.field] = this.editableInput.value;

          this.doRequest(obj);
        }
      });
      this.editableInput.focus();

      clearInterval(interval);
     } catch {}
    }, 100);
  }

  private doRequest(obj) {
    this.saving = true;

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
