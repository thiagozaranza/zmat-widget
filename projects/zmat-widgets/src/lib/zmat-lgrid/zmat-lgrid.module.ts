import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

import { ZmatLGridTableComponent } from './zmat-lgrid-table/zmat-lgrid-table.component';
import { ZmatLGridPaginationComponent } from './zmat-lgrid-pagination/zmat-lgrid-pagination.component';
import { ZmatLGridTdTextComponent } from './zmat-lgrid-td-text/zmat-lgrid-td-text.component';
import { ZmatLGridTdBoolComponent } from './zmat-lgrid-td-bool/zmat-lgrid-td-bool.component';
import { ZmatLGridTdActionComponent } from './zmat-lgrid-td-action/zmat-lgrid-td-action.component';

import { dynamicOutlet } from './dynamic-outlet';

@NgModule({
  declarations: [
    ZmatLGridTableComponent, 
    ZmatLGridPaginationComponent, 
    ZmatLGridTdTextComponent,      
    ZmatLGridTdBoolComponent, 
    ZmatLGridTdActionComponent,
    dynamicOutlet,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule
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
  ]
})
export class ZmatLGridModule { }
