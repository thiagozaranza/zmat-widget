import { AfterContentInit, Component, ViewChild } from '@angular/core';

import { IDatepickerSchema } from 'projects/zmat-widgets/src/public-api';
import { Moment } from 'moment';
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

  public datepickerDaySchema: IDatepickerSchema = {
    placeholder: 'Selecione um dia',
    value: new Date(),
    min: new Date('01/01/2000'),
    max: new Date(),
    panelClass: 'datepicker'
  };

  public datepickerMonthSchema: IDatepickerSchema = {
    placeholder: 'Selecione um mês',
    value: new Date(),
    min: new Date('01/01/2000'),
    max: new Date(),
    panelClass: 'datepicker'
  };

  public datepickerYearSchema: IDatepickerSchema = {
    placeholder: 'Selecione um ano',
    value: new Date(),
    min: new Date('01/01/2000'),
    max: new Date(),
    panelClass: 'datepicker'
  };

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

  diaSelecionado($event: Moment): void {
    this.toastService.textoDark($event.toISOString());
  }

  mesSelecionado($event: Moment): void {
    this.toastService.textoDark($event.toISOString());
  }

  anoSelecionado($event: Moment): void {
    this.toastService.textoDark($event.toISOString());
  }

  throwError($event): void {
    this.toastService.erro($event);
  }
}
