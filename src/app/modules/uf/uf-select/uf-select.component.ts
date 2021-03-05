import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { IModel } from 'projects/zmat-widgets/src/lib/commons/service.schema';
import { ISelectOneSchema } from 'projects/zmat-widgets/src/public-api';
import { UFs } from '../uf';

@Component({
  selector: 'app-uf-select',
  templateUrl: './uf-select.component.html',
  styleUrls: ['./uf-select.component.scss']
})
export class UfSelectComponent {

  public schema: ISelectOneSchema = {
    label: 'UF',
    placeholder: 'Selecione a UF'
  };

  public data = UFs;

  @Output() selected: EventEmitter<IModel> = new EventEmitter();

  itemSelected($event): void {
    console.log($event);
    this.selected.emit($event);
  }

}
