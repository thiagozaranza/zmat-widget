import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GridPagination, IGridColumnSchema, IGridPagination, IGridSchema } from '../grid.schema';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { GridSelection } from '../grid-selection';
import { IModel } from '../../service.schema';

@Component({
  selector: 'lib-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.css']
})
export class GridTableComponent<T extends IModel> implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  @Input() schema: IGridSchema<T>;
  @Input() data: T[];
  @Input() enableActions = true;
  @Input() showColumns: string[] = [];
  @Input() showFilters: string[] = [];

  @Output() selectionChanged: EventEmitter<T[]> = new EventEmitter();
  @Output() throwError: EventEmitter<string> = new EventEmitter();

  private $paginator: BehaviorSubject<GridPagination<T>> = new BehaviorSubject<GridPagination<T>>(null);
  public selector: GridSelection<T>;

  public $pagination: BehaviorSubject<GridPagination<T>> = new BehaviorSubject<GridPagination<T>>(new GridPagination());
  public pagination: GridPagination<T>;

  public $total = new BehaviorSubject<number>(null);

  public loading: boolean;

  ngOnInit(): void
  {
    if (this.showColumns.length) {
      this.schema.columns = this.schema.columns.filter(item => {
        return this.showColumns.includes(item.field);
      });
    }

    this.selector = new GridSelection(this.schema);

    if (this.schema.autoload === true && this.schema.pagination) {
      this.paginate(this.schema.pagination);
    }

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
          this.data = parsedApiResponse.data;
          this.selector.data = this.data;
          this.$pagination.next(this.pagination);
          this.$total.next(parsedApiResponse.total);
          this.loading = false;
        }, (error) => {
          this.loading = false;
          this.throwError.emit(error);
        }
      )).add(
      this.selector.$selection.subscribe(
        value => this.selectionChanged.emit(value)
      )
    );
  }

  paginate(pagination?: IGridPagination): void {

    if (!pagination && this.schema.pagination) {
      pagination = this.schema.pagination;
    }

    this.$paginator.next(new GridPagination(
      pagination.limit,
      pagination.sortColumn,
      pagination.sortDirection,
      pagination.page,
      pagination.filters,
      pagination.search)
    );
  }

  changedPage($event): void {
    this.pagination.page = $event;
    this.$paginator.next(this.pagination);
  }

  changedLimit($event): void {
    this.pagination.page = 1;
    this.pagination.limit = $event;
    this.$paginator.next(this.pagination);
  }

  changeSearch($event): void {
    this.selector.cleanSelection();
    this.pagination.page = 1;
    this.pagination.search = $event;
    this.$paginator.next(this.pagination);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.selector.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selector.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  orderBy(item: IGridColumnSchema<T>): void
  {
    this.pagination.sortColumn = item.field;
    this.pagination.sortDirection = (this.pagination.sortDirection === 'asc') ? 'desc' : 'asc';
    this.$paginator.next(this.pagination);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
