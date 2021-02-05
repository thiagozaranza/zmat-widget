import { Pipe, PipeTransform } from '@angular/core';

import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'currencyFormat'
})
export class ZmatInputFomatCurrencyPipe implements PipeTransform {
    constructor(private currencyPipe: CurrencyPipe) { }

    transform(value: number, locale: string, currency_symbol: boolean, number_format: string = '1.2-2'): string {
        if (value) {


            let newValue: string;

            newValue = this.currencyPipe.transform(value);
            if (locale === 'BRL') {
              newValue = newValue.replace('.', '|').replace(',', '.').replace('|', ',');
            }

            return newValue;
        }
    }
}
