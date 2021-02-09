import { Observable } from 'rxjs';

export declare type SortDirection = 'asc' | 'desc' | '';

export interface IModel {
  toJSON(): object;
  equals(obj: IModel): boolean;
}

export interface IGridPagination {
  limit?: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
  page?: number;
  filters?: any;
  seacrch?: string;
}

export interface IGridPaginateResponse {
  total: number;
  data: IModel[];
}

export interface IGriService {
  uri: string;
  getUrl: () => string;
  getUrlForId(id: number | string): string;
  paginate(pagination: GridPagination, gridSchema: IGridSchema): Observable<any>;
  parsePaginateResponse(response): IGridPaginateResponse;
  patch(obj: any): Observable<any>;
  pick(obj: any): Observable<any>;
}

export class GridPagination implements IGridPagination {

  constructor(
    public limit = 10,
    public sortColumn = null,
    public sortDirection = null,
    public page = 1,
    public filters = null,
    public search = null
  ) {

  }

  public static build(obj: IGridPagination): GridPagination {
    return new GridPagination(
      obj.limit,
      obj.sortColumn,
      obj.sortDirection,
      obj.page,
      obj.filters,
      obj.seacrch
    );
  }

  public toString(gridSchema: IGridSchema): string {
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

export interface IGridSchema {
  service: IGriService;
  pagination?: IGridPagination;
  enableSearch?: boolean;
  selectionMode?: GridSelectionModeType;
  parsePageParam?: (param: any) => string;
  parseSortParam?: (param: any) => string;
  parseLimitParam?: (param: any) => string;
  parseFiltersParam?: (param: any) => string;
  parseSearchParam?: (param: any) => string;
  columns: IGridColumnSchema[];
  actions?: IGridActionSchema[];
}

export interface IGridColumnSchema {
    title: string;
    field: string;
    ordenable?: boolean;
    editable?: boolean;
    format?: GridInputFormat;
    render: any;
    getData: (param: IModel) => any;
    saveChangesHandler?: any;
}

export interface IGridActionSchema {
    title: string;
    label: string;
    color: string;
    icon: string;
    render: any;
    action: (param: IModel) => any;
}
