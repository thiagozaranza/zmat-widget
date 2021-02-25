import { Observable } from 'rxjs';

export interface IModel {
  toJSON(): object;
  equals(obj: IModel): boolean;
}

export interface IService<T> {
  uri: string;
  getUrl: () => string;
  getUrlForId(id: number | string): string;
  get(query: string): Observable<T>;
  parsePaginatedResponse(response): IPaginatedResponse<T>;
  patch(obj: object): Observable<T>;
  pick(obj: T): Observable<T>;
}

export interface IPaginatedResponse<T> {
  total: number;
  data: T[];
}
