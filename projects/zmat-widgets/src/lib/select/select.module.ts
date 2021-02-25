import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { SelectManyComponent } from './select-many/select-many.component';
import { SelectOneComponent } from './select-one/select-one.component';

@NgModule({
  declarations: [
    SelectOneComponent,
    SelectManyComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [
    SelectOneComponent,
    SelectManyComponent
  ]
})
export class SelectModule { }
