import { Observable } from 'rxjs';

export interface IModel {
  getId(): string | number;
  getName(): string;
  toJSON(): object;
  equals(obj: IModel): boolean;
}

export interface IService<T extends IModel> {
  uri: string;
  getUrl: () => string;
  getUrlForId(id: number | string): string;
  get(query: string): Observable<T>;
  parsePaginatedResponse(response): IPaginatedResponse<T>;
  patch(obj: object): Observable<T>;
  pick(obj: T): Observable<T>;
}

export interface IPaginatedResponse<T extends IModel> {
  total: number;
  data: T[];
}
