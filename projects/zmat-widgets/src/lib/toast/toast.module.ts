import { ModuleWithProviders, NgModule } from '@angular/core';
import { TOAST_CONFIG_TOKEN, defaultToastConfig } from './toast.schema';

import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule
  ]
})
export class ToastModule {
  public static forRoot(config = defaultToastConfig): ModuleWithProviders<ToastModule> {
    return {
      ngModule: ToastModule,
      providers: [
        {
          provide: TOAST_CONFIG_TOKEN,
          useValue: config,
        },
      ],
    };
  }
}
