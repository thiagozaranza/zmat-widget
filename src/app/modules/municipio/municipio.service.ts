import { IMunicipiosPaginatedResponse, Municipio } from './municipio';

import { HttpClient } from '@angular/common/http';
import { IService } from 'projects/zmat-widgets/src/lib/service.schema';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService implements IService<Municipio> {

  uri = 'rest/adm/municipio';

  constructor(
    private http: HttpClient
  ) { }

  getUrl(): string {
    return `${environment.apiEndpoint}${this.uri}`;
  }

  getUrlForId(id: number | string): string {
    return `${this.getUrl()}/${id}`;
  }

  get(query: string): Observable<Municipio> {
    return this.http.get<any>(this.getUrl() + '?' + query);
  }

  parsePaginatedResponse(response): IMunicipiosPaginatedResponse<Municipio> {
    return {
      total: response.data.total_results,
      data: response.data.list.map(item => new Municipio(item.id, item.nome, item.uf))
    };
  }

  patch(obj: any): Observable<Municipio> {
    return this.http.patch<any>(this.getUrl(), obj);
  }

  pick(obj: any): Observable<Municipio> {
    return this.http.get<any>(this.getUrl());
  }
}
