import { CommonModule } from '@angular/common';
import { HomeIndexComponent } from './home-index/home-index.component';
import { MunicipioModule } from 'src/app/modules/municipio/municipio.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [HomeIndexComponent],
  imports: [
    CommonModule,
    MunicipioModule
  ]
})
export class HomeModule { }
