import { FormGroup } from '@angular/forms';
import { IModel } from '../commons/service.schema';
import { IPaginable } from '../commons/paginator';

export enum AutocompleteLoadingModeType {
  EAGER = 'eager',
  LAZY = 'lazy'
}
export interface IAutocompleteSchema<T extends IModel> extends IPaginable<T> {
  loadingMode: AutocompleteLoadingModeType;
  label: string;
  placeholder: string;
  formControlName?: string;
  formGroup?: FormGroup;
  panelClass?: string | string[];
}
