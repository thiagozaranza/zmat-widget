import { CommonModule } from '@angular/common';
import { DatepickerModule } from 'projects/zmat-widgets/src/public-api';
import { HomeIndexComponent } from './home-index/home-index.component';
import { MunicipioModule } from 'src/app/modules/municipio/municipio.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [HomeIndexComponent],
  imports: [
    CommonModule,
    MunicipioModule,
    DatepickerModule,
  ]
})
export class HomeModule { }
