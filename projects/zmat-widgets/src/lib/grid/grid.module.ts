import { CURRENCY_MASK_CONFIG, CurrencyFormatConfig } from '../input-format/input-format-currency/input-format-currency.config';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DynamicOutletDirective } from './dynamic-outlet.directive';
import { FormsModule } from '@angular/forms';
import { GridPaginationComponent } from './grid-pagination/grid-pagination.component';
import { GridSearchComponent } from './grid-search/grid-search.component';
import { GridTableComponent } from './grid-table/grid-table.component';
import { GridTdActionComponent } from './grid-td-action/grid-td-action.component';
import { GridTdBoolComponent } from './grid-td-bool/grid-td-bool.component';
import { GridTdTextComponent } from './grid-td-text/grid-td-text.component';
import { InputFormatModule } from '../input-format/input-format.module';
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
    GridTableComponent,
    GridPaginationComponent,
    GridTdTextComponent,
    GridTdBoolComponent,
    GridTdActionComponent,
    DynamicOutletDirective,
    GridSearchComponent,
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
    InputFormatModule
  ],
  exports: [
    GridTableComponent,
    GridPaginationComponent,
    GridTdTextComponent,
    GridTdBoolComponent,
    GridTdActionComponent,
    DynamicOutletDirective
  ],
  entryComponents: [
    GridTdTextComponent,
    GridTdBoolComponent,
    GridTdActionComponent
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'R$'}
  ]
})
export class GridModule { }
