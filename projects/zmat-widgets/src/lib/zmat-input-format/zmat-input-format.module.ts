import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ZmatInputFomatCurrencyPipe } from './zmat-input-format-currency/zmat-input-format-currency.pipe';
import { ZmatInputFormatCurrencyDirective } from './zmat-input-format-currency/zmat-input-format-currency.directive';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    ZmatInputFormatCurrencyDirective,
    ZmatInputFomatCurrencyPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ZmatInputFormatCurrencyDirective,
    ZmatInputFomatCurrencyPipe
  ],
  providers: [
    CurrencyPipe,
    {
      provide: LOCALE_ID,
      useValue: 'pt-PT'
    }
  ]
})
export class ZmatInputFormatModule { }
