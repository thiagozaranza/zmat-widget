import { Component, TemplateRef, ViewChild } from '@angular/core';
import { IGridCellRender, IGridColumnSchema } from '../grid.schema';

import { GridTableComponent } from '../grid-table/grid-table.component';
import { IModel } from '../../commons/service.schema';

@Component({
  selector: 'lib-grid-td-bool',
  templateUrl: './grid-td-bool.component.html',
  styleUrls: ['./grid-td-bool.component.css']
})
export class GridTdBoolComponent<T extends IModel> implements IGridCellRender<T>{
  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;
  schema: IGridColumnSchema<T>;
  data: T;
  constructor(public parent: GridTableComponent<T>){}
}
