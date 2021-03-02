import { IModel } from 'projects/zmat-widgets/src/lib/commons/service.schema';
export class Municipio implements IModel {

  constructor(
    public id: number,
    public nome: string,
    public uf: string
  ) { }

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
