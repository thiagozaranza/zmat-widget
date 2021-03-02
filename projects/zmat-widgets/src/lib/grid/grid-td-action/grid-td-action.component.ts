import { Component, TemplateRef, ViewChild } from '@angular/core';
import { IGridActionRender, IGridActionSchema } from '../grid.schema';

import { IModel } from '../../commons/service.schema';

@Component({
  selector: 'lib-grid-td-action',
  templateUrl: './grid-td-action.component.html',
  styleUrls: ['./grid-td-action.component.css']
})
export class GridTdActionComponent<T extends IModel> implements IGridActionRender<T> {
  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;
  schema: IGridActionSchema<T>;
  data: T;
}
