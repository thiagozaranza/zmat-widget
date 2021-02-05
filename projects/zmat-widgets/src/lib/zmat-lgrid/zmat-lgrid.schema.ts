import { Observable } from 'rxjs';

export type IGetPropertyFunc = (item: any) => any;

export type IRequestItemsFunc = (item: IZmatLgridPagination) => Observable<any>;

export type IParseParamFunc = (param: any) => string;

export declare type SortDirection = 'asc' | 'desc' | '';

export interface IZmatLgridPagination {
  limit?: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
  page?: number;
  filters?: any;
  seacrch?: string;
}

export class ZmatLgridPagination implements IZmatLgridPagination {

  constructor(
    public limit = 10,
    public sortColumn = null,
    public sortDirection = null,
    public page = 1,
    public filters = null,
    public search = null
  ) {

  }

  public static build(obj: IZmatLgridPagination): ZmatLgridPagination {
    return new ZmatLgridPagination(
      obj.limit,
      obj.sortColumn,
      obj.sortDirection,
      obj.page,
      obj.filters,
      obj.seacrch
    );
  }

  public toString(gridSchema: IZmatLGridSchema): string {
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

export enum ZmatLGridSelectionModeType {
  MULTI_SELECTION = 'multi',
  SINGLE_SELECTION = 'single',
  NO_SELECTION = 'none'
}

export enum ZmatLGridInputFormat {
  CURRENCY = 'currency',
  CPF_CNPJ = 'cpf_cnpj'
}

export interface IZmatLGridSchema {
  service: any;
  pagination?: IZmatLgridPagination;
  enableSearch?: boolean;
  selectionMode?: ZmatLGridSelectionModeType;
  parsePageParam?: IParseParamFunc;
  parseSortParam?: IParseParamFunc;
  parseLimitParam?: IParseParamFunc;
  parseFiltersParam?: IParseParamFunc;
  parseSearchParam?: IParseParamFunc;
  columns: IZmatLGridColumnSchema[];
  actions?: IZmatLGridActionSchema[];
}

export interface IZmatLGridColumnSchema {
    title: string;
    field: string;
    ordenable?: boolean;
    editable?: boolean;
    format?: ZmatLGridInputFormat;
    render: any;
    getData: IGetPropertyFunc;
    saveChangesHandler?: any;
}

export interface IZmatLGridActionSchema {
    title: string;
    label: string;
    color: string;
    icon: string;
    render: any;
    action: IGetPropertyFunc;
    getData: IGetPropertyFunc;
}
