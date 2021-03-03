import { InjectionToken } from "@angular/core";
import { MatSnackBarConfig } from "@angular/material/snack-bar";

export interface IToast {
  message: string;
  action: string;
  config: MatSnackBarConfig;
};

export const defaultToastConfig: MatSnackBarConfig = {
  duration: 5000,
  horizontalPosition: 'right',
  verticalPosition: 'top',
  direction: 'ltr',
  politeness: 'polite',
  panelClass: 'alert-light'
};

export const TOAST_CONFIG_TOKEN = new InjectionToken<string>('toast-config');
