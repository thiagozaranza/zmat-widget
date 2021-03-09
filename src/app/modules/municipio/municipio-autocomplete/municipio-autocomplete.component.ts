import { AutocompleteLoadingModeType, IAutocompleteSchema } from 'projects/zmat-widgets/src/lib/autocomplete/autocomplete.schema';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Municipio } from '../municipio';
import { MunicipioService } from '../municipio.service';

@Component({
  selector: 'app-municipio-autocomplete',
  templateUrl: './municipio-autocomplete.component.html',
  styleUrls: ['./municipio-autocomplete.component.scss']
})
export class MunicipioAutocompleteComponent implements OnInit {

  public schema: IAutocompleteSchema<Municipio>;

  @Input() formControlName: string;
  @Input() formGroup: FormGroup;

  @Output() selectionChanged: EventEmitter<Municipio> = new EventEmitter();
  @Output() throwError: EventEmitter<string> = new EventEmitter();

  constructor(private municipioService: MunicipioService) {
    this.schema = {
      service: this.municipioService,
      label: 'Município',
      placeholder: 'Selecione o município',
      loadingMode: AutocompleteLoadingModeType.LAZY,
      pagination: {
        page: 1,
        limit: null,
        sortColumn: 'nome',
        sortDirection: 'asc'
      },
      parseSearchParam: (search: string): string => {
        return 'nome-lk=' + search;
      }
    };
  }

  ngOnInit(): void {
    this.schema.formGroup =this.formGroup;
    this.schema.formControlName = this.formControlName;
  }

  changeSelection($event): void {
    this.selectionChanged.emit($event);
  }

  err($event): void {
    this.throwError.emit($event);
  }

}
