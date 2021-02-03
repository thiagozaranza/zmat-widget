import { IZmatLGridSchema, ZmatLgridPagination } from 'projects/zmat-widgets/src/public-api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  uri = 'rest/adm/municipio';

  constructor(
    private http: HttpClient
  ) { }

  getUrl(): string {
    return `${environment.apiEndpoint}${this.uri}`;
  }

  getUrlForId(id): string {
    return `${this.getUrl()}/${id}`;
  }

  paginate(pagination: ZmatLgridPagination, gridSchema: IZmatLGridSchema): Observable<any> {
    return this.http.get<any>(this.getUrl() + '?' + pagination.toString(gridSchema));
  }

  patch(obj: any): Observable<any> {
    return this.http.patch<any>(this.getUrl(), obj);
  }

  pick(obj: any): Observable<any> {
    return this.http.get<any>(this.getUrl());
  }
}
