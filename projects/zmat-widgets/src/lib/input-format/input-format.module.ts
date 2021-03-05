import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { InputFomatCurrencyPipe } from './input-format-currency/input-format-currency.pipe';
import { InputFormatCurrencyDirective } from './input-format-currency/input-format-currency.directive';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    InputFormatCurrencyDirective,
    InputFomatCurrencyPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InputFormatCurrencyDirective,
    InputFomatCurrencyPipe
  ],
  providers: [
    CurrencyPipe,
    {
      provide: LOCALE_ID,
      useValue: 'pt-PT'
    }
  ]
})
export class InputFormatModule { }
