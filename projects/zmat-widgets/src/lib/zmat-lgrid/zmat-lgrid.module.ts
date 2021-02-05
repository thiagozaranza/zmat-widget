import { CURRENCY_MASK_CONFIG, CurrencyFormatConfig } from '../zmat-input-format/zmat-input-format-currency/zmat-input-format-currency.config';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ZmatInputFormatModule } from '../zmat-input-format/zmat-input-format.module';
import { ZmatLGridPaginationComponent } from './zmat-lgrid-pagination/zmat-lgrid-pagination.component';
import { ZmatLGridTableComponent } from './zmat-lgrid-table/zmat-lgrid-table.component';
import { ZmatLGridTdActionComponent } from './zmat-lgrid-td-action/zmat-lgrid-td-action.component';
import { ZmatLGridTdBoolComponent } from './zmat-lgrid-td-bool/zmat-lgrid-td-bool.component';
import { ZmatLGridTdTextComponent } from './zmat-lgrid-td-text/zmat-lgrid-td-text.component';
import { ZmatLgridSearchComponent } from './zmat-lgrid-search/zmat-lgrid-search.component';
import { dynamicOutlet } from './dynamic-outlet';

export const CustomCurrencyMaskConfig: CurrencyFormatConfig = {
  align: 'right',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.'
};

@NgModule({
  declarations: [
    ZmatLGridTableComponent,
    ZmatLGridPaginationComponent,
    ZmatLGridTdTextComponent,
    ZmatLGridTdBoolComponent,
    ZmatLGridTdActionComponent,
    dynamicOutlet,
    ZmatLgridSearchComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    ZmatInputFormatModule
  ],
  exports: [
    ZmatLGridTableComponent,
    ZmatLGridPaginationComponent,
    ZmatLGridTdTextComponent,
    ZmatLGridTdBoolComponent,
    ZmatLGridTdActionComponent
  ],
  entryComponents: [
    ZmatLGridTdTextComponent,
    ZmatLGridTdBoolComponent,
    ZmatLGridTdActionComponent
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'R$'}
  ]
})
export class ZmatLGridModule { }
