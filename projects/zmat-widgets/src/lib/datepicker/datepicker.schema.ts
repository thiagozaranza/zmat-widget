import { FormGroup } from '@angular/forms';

export interface IDatepickerSchema {
  placeholder?: string;
  value?: Date;
  min?: Date;
  max?: Date;
  formControlName?: string;
  formGroup?: FormGroup;
  panelClass?: string | string[];
}

export const defaultDatepickerSchema: IDatepickerSchema = {
  placeholder: 'Selecione a data',
  value: new Date(),
  min: new Date('1900/1/1'),
  max: new Date('2099/12/31')
};
