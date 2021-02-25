import { AfterContentInit, Component, ViewChild } from '@angular/core';

import { Municipio } from 'src/app/modules/municipio/municipio';
import { MunicipioTableComponent } from 'src/app/modules/municipio/municipio-table/municipio-table.component';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss']
})
export class HomeIndexComponent implements AfterContentInit {

  @ViewChild('cnpGridMunicipio', {static: true}) grid: MunicipioTableComponent;

  public municipios: Municipio[] = [];

  constructor() {

  }

  ngAfterContentInit(): void {
    this.grid.table.paginate({
      page: 2
    });
  }

  municipioSelecionado($event): void {
    this.municipios = $event;
  }
}
