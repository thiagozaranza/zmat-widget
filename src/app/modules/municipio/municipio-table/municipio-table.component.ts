import { Component, OnInit } from '@angular/core';
import { IZmatLGridSchema, ZmatLGridTdActionComponent, ZmatLGridTdTextComponent } from 'projects/zmat-widgets/src/public-api';

import { Municipio } from '../municipio';
import { MunicipioService } from '../municipio.service';

@Component({
  selector: 'app-municipio-table',
  templateUrl: './municipio-table.component.html',
  styleUrls: ['./municipio-table.component.scss']
})
export class MunicipioTableComponent implements OnInit {

  public gridSchema: IZmatLGridSchema;

  public data: Municipio[] = [];

  constructor(municipioService: MunicipioService) {

    this.gridSchema = {
      service: municipioService,
      pagination: {
        page: 1,
        limit: 10,
        sortColumn: 'nome'
      },
      columns: [
        {
          title: 'ID',
          field: 'id',
          ordenable: true,
          render: ZmatLGridTdTextComponent,
          getData(obj: Municipio): number {
            return obj.id;
          }
        },
        {
          title: 'Nome Municipio',
          field: 'nome',
          ordenable: true,
          render: ZmatLGridTdTextComponent,
          getData(obj: Municipio): string {
            return obj.nome;
          }
        },
        {
          title: 'Município',
          field: 'uf',
          ordenable: false,
          render: ZmatLGridTdTextComponent,
          getData(obj: Municipio): string {
            return obj.uf;
          }
        }
      ],
      actions: [
        {
          title: 'Dados',
          label: 'Visualizar dados',
          color: 'primary',
          icon: 'list',
          render: ZmatLGridTdActionComponent,
          action(obj: Municipio): void {
            console.log('Visualizar dados do município');
            console.log(obj);
          },
          getData(): void {}
        }
      ]
    }
  }

  ngOnInit(): void {
  }

}
