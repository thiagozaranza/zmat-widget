import { DatepickerModule, SelectModule } from 'projects/zmat-widgets/src/public-api';

import { CommonModule } from '@angular/common';
import { HomeIndexComponent } from './home-index/home-index.component';
import { MunicipioModule } from 'src/app/modules/municipio/municipio.module';
import { NgModule } from '@angular/core';
import { UfModule } from 'src/app/modules/uf/uf.module';

@NgModule({
  declarations: [HomeIndexComponent],
  imports: [
    CommonModule,
    MunicipioModule,
    DatepickerModule,
    UfModule
  ]
})
export class HomeModule { }
