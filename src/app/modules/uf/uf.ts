import { IModel } from 'projects/zmat-widgets/src/lib/commons/service.schema';

export interface UfDTO {
  sigla: string;
  nome: string;
}
export class Uf implements IModel {

  public sigla: string;
  public nome: string;

  constructor(uf: UfDTO) {
    this.sigla = uf.sigla;
    this.nome = uf.nome;
  }

  getId(): string {
    return this.sigla;
  }

  getName(): string {
    return this.nome;
  }

  toJSON(): object {
    return Object.assign(this);
  }

  equals(obj: Uf): boolean {
    return this.sigla === obj.sigla;
  }
}

export const UFs: Uf[] = [
  {sigla: 'RN', nome: 'Rio Grande do Norte'},
  {sigla: 'CE', nome: 'Ceará'},
].map(item => new Uf(item));
