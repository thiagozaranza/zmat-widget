import { BehaviorSubject, Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPaginator, Paginator } from '../../commons/paginator';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { FormControl } from '@angular/forms';
import { IAutocompleteSchema } from '../autocomplete.schema';
import { IModel } from '../../commons/service.schema';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'lib-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent<T extends IModel> implements OnInit {

  private subscriptions = new Subscription();

  @Input() schema: IAutocompleteSchema<T>;
  @Input() data: T[] = [];

  @Output() selectionChanged: EventEmitter<T> = new EventEmitter();
  @Output() throwError: EventEmitter<string> = new EventEmitter();

  public formControl = new FormControl();

  public pagination: Paginator<T>;
  private $paginator: BehaviorSubject<Paginator<T>> = new BehaviorSubject<Paginator<T>>(null);

  public $filteredOptions: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  public loading = false;

  ngOnInit(): void {

    if (this.schema.pagination) {
      this.pagination = new Paginator(this.schema.pagination);
    }

    this.formControl.valueChanges.subscribe(value => {
      this.pagination.search = value;

      if (this.$filteredOptions?.getValue().filter(a => a.getName() === this.pagination.search).length === 1) {
        return;
      }

      if (value.length === 0) {
        this.$filteredOptions = new BehaviorSubject<T[]>([]);
        return;
      } else if (value.length < 3) {
        return;
      }

      this.paginate(this.pagination);
    });

    this.subscriptions.add(
      this.$paginator.pipe(
        filter(value => value != null),
        tap((pagination) => {
          this.loading = true;
          this.pagination = pagination;
        }),
        switchMap(pagination => this.schema.service.get(pagination.toString(this.schema))),
        map(apiResponse => this.schema.service.parsePaginatedResponse(apiResponse))
      ).subscribe(
        (parsedApiResponse) => {
          this.$filteredOptions.next(parsedApiResponse.data);
          this.loading = false;
        }, (error) => {
          this.loading = false;
          this.throwError.emit(error);
        }
      )
    );
  }

  private paginate(pagination: IPaginator): void {
    if (!pagination && this.schema.pagination) {
      pagination = this.schema.pagination;
    }

    this.$paginator.next(new Paginator(pagination)
    );
  }

  public optionSelected($event: MatAutocompleteSelectedEvent): void {

    const selectedOption = this.$filteredOptions
      .getValue()
      .filter(value => value.getName() === $event.option.value)
      .pop();

    this.schema.formGroup?.get(this.schema.formControlName).setValue(selectedOption.getId());

    this.selectionChanged.emit(selectedOption);
  }

  public getPanelClasses(): string {

    let classes = [];

    if (!this.schema.panelClass) {
      return;
    }

    if (typeof this.schema.panelClass === 'string') {
      classes.push(this.schema.panelClass);
    } else {
      classes = this.schema.panelClass;
    }

    return classes.join(' ');
  }
}
