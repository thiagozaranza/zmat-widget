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
export interface IGridCellRender<T extends IModel> {
  parent: GridTableComponent<T>;
  schema: IGridColumnSchema<T>;
  data: T;
}

export interface IGridActionRender<T> {
  schema: IGridActionSchema<T>;
  data: T;
}

export interface IGridColumnSchema<T extends IModel> {
  title: string;
  field: string;
  ordenable?: boolean;
  editable?: boolean;
  format?: GridInputFormat;
  render: new(parent: GridTableComponent<T>) => IGridCellRender<T>;
  getData: (model: T) => string | number | boolean;
  saveChangesHandler?: () => void;
}

export interface IGridActionSchema<T> {
  title: string;
  label: string;
  color: string;
  icon: string;
  render: new() => IGridActionRender<T>;
  action: (model: T) => void;
}
