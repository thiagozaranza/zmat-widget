import { IToast, TOAST_CONFIG_TOKEN } from './toast.schema';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public toaster$: Subject<IToast> = new Subject();

  constructor(@Inject(TOAST_CONFIG_TOKEN) private toastConfig: MatSnackBarConfig) { }

  private show(message: string, panelClass: string = 'alert-info',  action: string = 'OK'): void {

    this.toastConfig.panelClass = panelClass;

    this.toaster$.next({
      message,
      config: this.toastConfig,
      action: 'OK'
    });
  }

  public textoDark(message: string): void {
    this.show(message, 'alert-dark');
  }

  public textoLight(message: string): void {
    this.show(message, 'alert-light');
  }

  public info(message: string): void {
    this.show(message, 'alert-info');
  }

  public alerta(message: string): void {
    this.show(message, 'alert-warning');
  }

  public erro(message: string): void {
    this.show(message, 'alert-danger');
  }

  public sucesso(message: string): void {
    this.show(message, 'alert-success');
  }
}
