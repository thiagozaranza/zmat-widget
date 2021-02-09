import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MunicipioService } from './municipio.service';
import { MunicipioTableComponent } from './municipio-table/municipio-table.component';
import { NgModule } from '@angular/core';
import { GridModule } from 'projects/zmat-widgets/src/public-api';

@NgModule({
  declarations: [MunicipioTableComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    GridModule
  ],
  exports: [MunicipioTableComponent],
  providers: [MunicipioService]
})
export class MunicipioModule { }
