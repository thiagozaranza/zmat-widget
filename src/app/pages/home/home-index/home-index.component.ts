import { AfterContentInit, Component, ViewChild } from '@angular/core';

import { Municipio } from 'src/app/modules/municipio/municipio';
import { MunicipioTableComponent } from 'src/app/modules/municipio/municipio-table/municipio-table.component';
import { ToastService } from 'projects/zmat-widgets/src/lib/toast/toast.service';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss']
})
export class HomeIndexComponent implements AfterContentInit {

  @ViewChild('cmpGridMunicipio', {static: true}) grid: MunicipioTableComponent;

  public municipios: Municipio[] = [];

  constructor(private toastService: ToastService) {

  }

  ngAfterContentInit(): void {
    // this.grid.table.paginate({ page: 2 });
  }

  municipiosSelecionados($event: Municipio[]): void {

    this.toastService.alerta($event[$event.length - 1]?.getName());
    this.municipios = $event;
  }

  municipioSelecionado($event: Municipio): void {
    this.toastService.info($event.getName());
    this.municipios = [$event];
  }

  throwError($event): void {
    this.toastService.erro($event);
  }
}
