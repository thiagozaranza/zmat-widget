import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { IDatepickerSchema, ISelectOneSchema } from 'projects/zmat-widgets/src/public-api';
import { UFs, Uf } from 'src/app/modules/uf/uf';

import { IModel } from 'projects/zmat-widgets/src/lib/commons/service.schema';
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

  public homeForm = this.fb.group({
    uf: [''],
    dia: [''],
    mes: [''],
    ano: [''],
    municipio: ['']
  });

  public datepickerDaySchema: IDatepickerSchema = {
    placeholder: 'Selecione um dia',
    value: new Date(),
    min: new Date('01/01/2000'),
    max: new Date(),
    panelClass: ['datepicker', 'mat-elevation-z2'],
    formControlName: 'dia',
    formGroup: this.homeForm
  };

  public datepickerMonthSchema: IDatepickerSchema = {
    placeholder: 'Selecione um mês',
    value: new Date(),
    min: new Date('01/01/2000'),
    max: new Date(),
    panelClass: 'datepicker',
    formControlName: 'mes',
    formGroup: this.homeForm
  };

  public datepickerYearSchema: IDatepickerSchema = {
    placeholder: 'Selecione um ano',
    value: new Date(),
    min: new Date('01/01/2000'),
    max: new Date(),
    panelClass: 'datepicker',
    formControlName: 'ano',
    formGroup: this.homeForm
  };

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService) {
  }

  ngAfterContentInit(): void {
    // this.grid.table.paginate({ page: 2 });
    this.homeForm.valueChanges.subscribe(value => console.log(value));
  }

  municipiosSelecionados($event: Municipio[]): void {

    this.toastService.alerta($event[$event.length - 1]?.getName());
    this.municipios = $event;
  }

  municipioSelecionado($event: Municipio): void {
    this.toastService.info($event.getName());
    this.municipios = [$event];
  }

  diaSelecionado($event: string): void {
    this.toastService.textoDark($event);
  }

  mesSelecionado($event: string): void {
    this.toastService.textoDark($event);
  }

  anoSelecionado($event: string): void {
    this.toastService.textoDark($event);
  }

  ufSelecionada($event: IModel): void {
    this.toastService.textoLight($event.getName());
  }

  throwError($event): void {
    this.toastService.erro($event);
  }
}
