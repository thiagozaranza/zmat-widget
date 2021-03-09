import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UFs, Uf } from '../uf';

import { IModel } from 'projects/zmat-widgets/src/lib/commons/service.schema';
import { ISelectOneSchema } from 'projects/zmat-widgets/src/public-api';

@Component({
  selector: 'app-uf-select',
  templateUrl: './uf-select.component.html',
  styleUrls: ['./uf-select.component.scss']
})
export class UfSelectComponent implements OnInit {

  public schema: ISelectOneSchema = {
    label: 'UF',
    placeholder: 'Selecione a UF'
  };

  public data = UFs;
  @Input() formGroup: FormGroup;
  @Input() formControlName: string;
  @Output() selected: EventEmitter<IModel> = new EventEmitter();

  public constructor() {

  }

  ngOnInit(): void {
    this.schema.formGroup =this.formGroup;
    this.schema.formControlName = this.formControlName;
  }

  itemSelected($event: Uf): void {
    this.selected.emit($event);
  }
}
