import { FormGroup } from '@angular/forms';

export interface ISelectOneSchema {
  label: string;
  placeholder: string;
  formControlName?: string;
  formGroup?: FormGroup;
  panelClass?: string | string[];
}
