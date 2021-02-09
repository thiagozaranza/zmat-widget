import { IGridPaginateResponse, IModel } from 'projects/zmat-widgets/src/public-api';
export interface IMunicipiosPaginatedResponse extends IGridPaginateResponse {
  data: Municipio[];
}
export class Municipio implements IModel {

  constructor(
    public id: number,
    public nome: string,
    public uf: string
  ) { }

  toJSON(): object {
    const serialized = Object.assign(this);
    return serialized;
  }

  equals(obj: Municipio): boolean {
    return this.id === obj.id;
  }
}
