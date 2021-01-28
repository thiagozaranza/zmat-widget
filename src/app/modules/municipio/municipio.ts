export interface IMunicipio {
  id: number;
  nome: string;
  uf: string;
}

export interface IMunicipios {
  total: number;
  data: Municipio[];
}

export abstract class ZmatModel {
  static parseResponse(response) {}

}

export class Municipio extends ZmatModel implements IMunicipio  {
  constructor(
    public id = 0,
    public nome = '',
    public uf = ''
  ) {
    super();
  }

  static parseResponse(response): IMunicipios {
    return {
      total: response.data.total_results,
      data: response.data.list.map(item => Municipio.build(item))
    };
  }

  static build(municipio: IMunicipio): Municipio {
    if (!municipio) {
      return new Municipio();
    }

    return new Municipio(
      municipio.id,
      municipio.nome,
      municipio.uf
    );
  }

  toJSON(): object {
    const serialized = Object.assign(this);
    return serialized;
  }
}
