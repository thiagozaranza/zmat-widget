import { GridTableComponent } from './grid-table/grid-table.component';
import { IModel } from '../commons/service.schema';
import { IPaginable } from '../commons/paginator';

export enum GridSelectionModeType {
  MULTI_SELECTION = 'multi',
  SINGLE_SELECTION = 'single',
  NO_SELECTION = 'none'
}

export enum GridInputFormat {
  CURRENCY = 'currency',
  CPF_CNPJ = 'cpf_cnpj'
}
export interface IGridSchema<T extends IModel> extends IPaginable<T> {
  enableSearch?: boolean;
  selectionMode?: GridSelectionModeType;
  columns: IGridColumnSchema<T>[];
  actions?: IGridActionSchema<T>[];
}
export interface IGridRender<T extends IModel> {
  parent: GridTableComponent<T>;
  schema: IGridItemSchema;
  data: T;
}
export interface IGridCellRender<T extends IModel> extends IGridRender<T> {
  schema: IGridColumnSchema<T>;
}

export interface IGridActionRender<T extends IModel> extends IGridRender<T> {
  schema: IGridActionSchema<T>;
}

export interface IGridItemSchema {
  title: string;
}

export interface IGridColumnSchema<T extends IModel> extends IGridItemSchema {
  field: string;
  ordenable?: boolean;
  editable?: boolean;
  format?: GridInputFormat;
  render: new(parent: GridTableComponent<T>) => IGridRender<T>;
  getData: (model: T) => string;
  saveChangesHandler?: () => void;
}

export interface IGridActionSchema<T extends IModel> extends IGridItemSchema  {
  label: string;
  color: string;
  icon: string;
  render: new() => IGridRender<T>;
  action: (model: T) => void;
}
