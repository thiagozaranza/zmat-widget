import { AutocompleteModule } from 'projects/zmat-widgets/src/lib/autocomplete/autocomplete.module';
import { CommonModule } from '@angular/common';
import { GridModule } from 'projects/zmat-widgets/src/public-api';
import { HttpClientModule } from '@angular/common/http';
import { MunicipioAutocompleteComponent } from './municipio-autocomplete/municipio-autocomplete.component';
import { MunicipioService } from './municipio.service';
import { MunicipioTableComponent } from './municipio-table/municipio-table.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    MunicipioTableComponent,
    MunicipioAutocompleteComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GridModule,
    AutocompleteModule
  ],
  exports: [
    MunicipioTableComponent,
    MunicipioAutocompleteComponent
  ],
  providers: [
    MunicipioService
  ]
})
export class MunicipioModule { }
