import { Component, OnInit } from '@angular/core';

import { Municipio } from 'src/app/modules/municipio/municipio';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss']
})
export class HomeIndexComponent implements OnInit {

  public municipios: Municipio[] = [];

  constructor() {

  }

  ngOnInit(): void {
  }

  municipioSelecionado($event): void {
    this.municipios = $event;
  }

}
