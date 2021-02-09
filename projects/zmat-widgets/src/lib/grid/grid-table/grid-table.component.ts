import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IGridColumnSchema, IGridSchema, GridPagination } from '../grid.schema';
import { map, switchMap, tap } from 'rxjs/operators';

import { GridSelection } from '../grid-selection';

@Component({
  selector: 'lib-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.css']
})
export class GridTableComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  @Input() schema: IGridSchema;
  @Input() data: any[];
  @Input() enableActions = true;
  @Input() showColumns: string[] = [];
  @Input() showFilters: string[] = [];

  @Output() selectionChanged: EventEmitter<any[]> = new EventEmitter();
  @Output() throwError: EventEmitter<any> = new EventEmitter();

  private $paginator: BehaviorSubject<GridPagination>;
  public selector: GridSelection;

  public $pagination: BehaviorSubject<GridPagination> = new BehaviorSubject<GridPagination>(new GridPagination());
  public pagination: GridPagination;

  public $total = new BehaviorSubject<number>(null);

  public loading = false;

  constructor() { }

  ngOnInit(): void
  {
    if (this.showColumns.length) {
      this.schema.columns = this.schema.columns.filter(item => {
        return this.showColumns.includes(item.field);
      });
    }

    this.selector = new GridSelection(this.schema);

    if (this.schema.pagination) {
      this.$paginator = new BehaviorSubject<GridPagination>(GridPagination.build(this.schema.pagination));
    } else {
      this.$paginator = new BehaviorSubject<GridPagination>(new GridPagination());
    }

    this.subscriptions.add(
      this.$paginator?.pipe(
        tap((zmatPagination) => {
          this.loading = true;
          this.pagination = zmatPagination;
        }),
        switchMap(zmatPagination => this.schema.service.paginate(zmatPagination, this.schema)),
        map(apiResponse => this.schema.service.parsePaginateResponse(apiResponse))
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

  orderBy(item: IGridColumnSchema): void
  {
    this.pagination.sortColumn = item.field;
    this.pagination.sortDirection = (this.pagination.sortDirection === 'asc') ? 'desc' : 'asc';
    this.$paginator.next(this.pagination);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
