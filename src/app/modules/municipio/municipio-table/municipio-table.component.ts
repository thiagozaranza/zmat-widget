import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IZmatLGridSchema, ZmatLGridSelectionModeType, ZmatLGridTdActionComponent, ZmatLGridTdTextComponent } from 'projects/zmat-widgets/src/public-api';

import { Municipio } from '../municipio';
import { MunicipioService } from '../municipio.service';

@Component({
  selector: 'app-municipio-table',
  templateUrl: './municipio-table.component.html',
  styleUrls: ['./municipio-table.component.scss']
})
export class MunicipioTableComponent implements OnInit {

  @Output() selectionChanged: EventEmitter<any[]> = new EventEmitter();
  @Output() throwError: EventEmitter<any> = new EventEmitter();

  public gridSchema: IZmatLGridSchema;

  public data: Municipio[] = [];

  constructor(municipioService: MunicipioService) {

    this.gridSchema = {
      service: municipioService,
      enableSeach: true,
      selectionMode: ZmatLGridSelectionModeType.MULTI_SELECTION,
      pagination: {
        page: 1,
        limit: 10,
        sortColumn: 'uf',
        filters: {
          uf: 'CE'
        }
      },
      parseSearchParam(search): string {
        return 'nome-lk=' + search;
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
          title: 'Municipio',
          field: 'nome',
          ordenable: true,
          render: ZmatLGridTdTextComponent,
          getData(obj: Municipio): string {
            return obj.nome;
          }
        },
        {
          title: 'UF',
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

  changeSelection($event): void {
    this.selectionChanged.emit($event);
  }

  err($event): void {
    this.throwError.emit($event);
  }
}
