import { InjectionToken } from '@angular/core';

export interface CurrencyFormatConfig {
    align: string;
    allowNegative: boolean;
    decimal: string;
    precision: number;
    prefix: string;
    suffix: string;
    thousands: string;
}

export let CURRENCY_MASK_CONFIG = new InjectionToken<CurrencyFormatConfig>('currency.mask.config');
