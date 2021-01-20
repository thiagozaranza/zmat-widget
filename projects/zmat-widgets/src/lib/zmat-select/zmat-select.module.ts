import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ZmatSelectOneComponent } from './zmat-select-one/zmat-select-one.component';
import { ZmatSelectManyComponent } from './zmat-select-many/zmat-select-many.component';



@NgModule({
  declarations: [
    ZmatSelectOneComponent, 
    ZmatSelectManyComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule    
  ],
  exports: [
    ZmatSelectOneComponent, 
    ZmatSelectManyComponent
  ]
})
export class ZmatSelectModule { }
