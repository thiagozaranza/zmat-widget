import { IModel, IService } from '../service.schema';

import { GridTableComponent } from './grid-table/grid-table.component';

export declare type SortDirection = 'asc' | 'desc' | '';

export interface IGridPagination {
  page?: number;
  limit?: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
  filters?: object;
  search?: string;
}

export class GridPagination<T extends IModel> implements IGridPagination {

  constructor(
    public limit = 10,
    public sortColumn = null,
    public sortDirection = null,
    public page = 1,
    public filters = null,
    public search = null
  ) {

  }

  public toString(gridSchema: IGridSchema<T>): string {
    const query = [];

    if (this.limit) {
      if (gridSchema.parseLimitParam) {
        query.push(gridSchema.parseLimitParam(this.limit));
      } else {
        query.push('limit=' + this.limit);
      }
    }

    if (this.sortColumn) {
      if (gridSchema.parseSortParam) {
        query.push(gridSchema.parseSortParam(this.sortColumn));
      } else {
        let order = 'orderBy=' + this.sortColumn;
        if (this.sortDirection) {
          order += ',' + this.sortDirection;
        }
        query.push(order);
      }
    }

    if (this.page) {
      if (gridSchema.parsePageParam) {
        query.push(gridSchema.parsePageParam(this.page));
      } else {
        query.push('page=' + this.page);
      }
    }

    if (this.filters) {
      if (gridSchema.parseFiltersParam) {
        query.push(gridSchema.parseFiltersParam(this.filters));
      } else {
        query.push(Object.keys(this.filters).map(key => key + '=' + this.filters[key]).join('&'));
      }
    }

    if (this.search) {
      if (gridSchema.parseSearchParam) {
        query.push(gridSchema.parseSearchParam(this.search));
      } else {
        query.push('search=' + this.search);
      }
    }

    return query.join('&');
  }
}

export enum GridSelectionModeType {
  MULTI_SELECTION = 'multi',
  SINGLE_SELECTION = 'single',
  NO_SELECTION = 'none'
}

export enum GridInputFormat {
  CURRENCY = 'currency',
  CPF_CNPJ = 'cpf_cnpj'
}

export interface IGridSchema<T extends IModel> {
  service: IService<T>;
  autoload?: boolean;
  pagination?: IGridPagination;
  enableSearch?: boolean;
  selectionMode?: GridSelectionModeType;
  parsePageParam?: (param: number) => string;
  parseSortParam?: (param: string) => string;
  parseLimitParam?: (param: string | number) => string;
  parseFiltersParam?: (param: object) => string;
  parseSearchParam?: (param: string) => string;
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
