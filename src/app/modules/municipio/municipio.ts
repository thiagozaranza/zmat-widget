import { IModel } from 'projects/zmat-widgets/src/lib/commons/service.schema';

export interface MunicipioDTO {
  id: number;
  nome: string;
  uf: string;
}
export class Municipio implements IModel {

  public id: number;
  public nome: string;
  public uf: string;

  constructor(municipio: MunicipioDTO)
  {
    this.id = municipio.id;
    this.nome = municipio.nome;
    this.uf = municipio.uf;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.nome + ' (' + this.uf + ')';
  }

  toJSON(): object {
    const serialized = Object.assign(this);
    return serialized;
  }

  equals(obj: Municipio): boolean {
    return this.id === obj.id;
  }
}
