import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { GridInputFormat, GridSelectionModeType, GridTableComponent, GridTdActionComponent, GridTdBoolComponent, GridTdTextComponent, IGridSchema } from 'projects/zmat-widgets/src/public-api';

import { Municipio } from '../municipio';
import { MunicipioService } from '../municipio.service';

@Component({
  selector: 'app-municipio-table',
  templateUrl: './municipio-table.component.html',
  styleUrls: ['./municipio-table.component.scss']
})
export class MunicipioTableComponent implements OnInit {

  @Output() selectionChanged: EventEmitter<Municipio[]> = new EventEmitter();
  @Output() throwError: EventEmitter<string> = new EventEmitter();

  @ViewChild('gridMunicipio', {static: true}) table: GridTableComponent<Municipio>;

  public schema: IGridSchema<Municipio>;

  public data: Municipio[] = [];

  constructor(municipioService: MunicipioService) {

    this.schema = {
      service: municipioService,
      autoload: false,
      enableSearch: true,
      selectionMode: GridSelectionModeType.MULTI_SELECTION,
      pagination: {
        page: 1,
        limit: 5,
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
          editable: true,
          format: GridInputFormat.CURRENCY,
          render: GridTdTextComponent,
          getData(obj: Municipio): number {
            return obj.id;
          }
        },
        {
          title: 'Municipio',
          field: 'nome',
          ordenable: true,
          editable: true,
          render: GridTdTextComponent,
          getData(obj: Municipio): string {
            return obj.nome;
          }
        },
        {
          title: 'UF',
          field: 'uf',
          ordenable: false,
          render: GridTdTextComponent,
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
          render: GridTdActionComponent,
          action(obj: Municipio): void {
            console.log('Visualizar dados do município');
            console.log(obj);
          }
        }
      ]
    };
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
