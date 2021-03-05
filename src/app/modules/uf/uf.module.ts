import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectModule } from 'projects/zmat-widgets/src/public-api';
import { UfSelectComponent } from './uf-select/uf-select.component';

@NgModule({
  declarations: [
    UfSelectComponent
  ],
  imports: [
    CommonModule,
    SelectModule
  ],
  exports: [
    UfSelectComponent
  ]
})
export class UfModule { }
