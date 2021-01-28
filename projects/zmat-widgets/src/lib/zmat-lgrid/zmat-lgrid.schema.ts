import { Observable } from "rxjs";

export type IGetPropertyFunc = (item: any) => any;

export type IRequestItemsFunc = (item: IZmatLgridPagination) => Observable<any>;

export type IParseParamFunc = (param: IZmatLgridPagination) => string;

export declare type SortDirection = 'asc' | 'desc' | '';

export interface IZmatLgridPagination {
  limit?: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
  page?: number;
  filters?: any;
}

export class ZmatLgridPagination implements IZmatLgridPagination {

  constructor(
    public limit = 10,
    public sortColumn = null,
    public sortDirection = null,
    public page = 1,
    public filters = null
  ) {

  }

  public static build(obj: IZmatLgridPagination): ZmatLgridPagination {
    return new ZmatLgridPagination(
      obj.limit,
      obj.sortDirection,
      obj.sortDirection,
      obj.page,
      obj.filters
    );
  }

  public toString(gridSchema: IZmatLGridSchema): string {
    const query = [];

    if (this.limit) {
      if (gridSchema.parseLimitParam) {
        query.push(gridSchema.parseLimitParam(this));
      } else {
        query.push('limit=' + this.limit);
      }
    }

    if (this.sortColumn) {
      if (gridSchema.parseSortParam) {
        query.push(gridSchema.parseSortParam(this));
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
        query.push(gridSchema.parsePageParam(this));
      } else {
        query.push('page=' + this.page);
      }
    }

    if (this.filters) {
      if (gridSchema.parseFiltersParam) {
        query.push(gridSchema.parsePageParam(this));
      } else {
        query.push('page=' + this.page);
      }
    }

    return query.join('&');
  }
}

export interface IZmatLGridSchema {
  service: any;
  pagination: IZmatLgridPagination;
  parsePageParam?: IParseParamFunc;
  parseSortParam?: IParseParamFunc;
  parseLimitParam?: IParseParamFunc;
  parseFiltersParam?: IParseParamFunc;
  columns: IZmatLGridColumnSchema[];
  actions: IZmatLGridActionSchema[];
}

export interface IZmatLGridColumnSchema {
    title: string;
    field: string;
    ordenable?: boolean;
    render: any;
    getData: IGetPropertyFunc;
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
