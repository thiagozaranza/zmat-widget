import { IModel, IService } from './service.schema';

export declare type SortDirection = 'asc' | 'desc' | '';

export interface IPaginator {
  page?: number;
  limit?: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
  filters?: object;
  search?: string;
}

export interface IPaginable<T extends IModel> {
  service: IService<T>;
  pagination?: IPaginator;
  autoload?: boolean;
  parsePageParam?: (param: number) => string;
  parseSortParam?: (param: string) => string;
  parseLimitParam?: (param: string | number) => string;
  parseFiltersParam?: (param: object) => string;
  parseSearchParam?: (param: string) => string;
}

export class Paginator<T extends IModel> implements IPaginator {

  public limit: number;
  public sortColumn: string;
  public sortDirection: SortDirection;
  public page: number;
  public filters: object;
  public search: string;

  constructor(pagination: IPaginator) {
    this.limit = pagination?.limit;
    this.sortColumn = pagination?.sortColumn;
    this.sortDirection = pagination?.sortDirection;
    this.page = pagination?.page;
    this.filters = pagination?.filters;
    this.search = pagination?.search;
  }

  public toString(schema: IPaginable<T>): string {
    const query = [];

    if (this.limit) {
      if (schema.parseLimitParam) {
        query.push(schema.parseLimitParam(this.limit));
      } else {
        query.push('limit=' + this.limit);
      }
    }

    if (this.sortColumn) {
      if (schema.parseSortParam) {
        query.push(schema.parseSortParam(this.sortColumn));
      } else {
        let order = 'orderBy=' + this.sortColumn;
        if (this.sortDirection) {
          order += ',' + this.sortDirection;
        }
        query.push(order);
      }
    }

    if (this.page) {
      if (schema.parsePageParam) {
        query.push(schema.parsePageParam(this.page));
      } else {
        query.push('page=' + this.page);
      }
    }

    if (this.filters) {
      if (schema.parseFiltersParam) {
        query.push(schema.parseFiltersParam(this.filters));
      } else {
        query.push(Object.keys(this.filters).map(key => key + '=' + this.filters[key]).join('&'));
      }
    }

    if (this.search) {
      if (schema.parseSearchParam) {
        query.push(schema.parseSearchParam(this.search));
      } else {
        query.push('search=' + this.search);
      }
    }

    return query.join('&');
  }
}
