import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IZmatLGridColumnSchema, IZmatLGridSchema, ZmatLgridPagination } from '../zmat-lgrid.schema';
import { map, switchMap, tap } from 'rxjs/operators';

import { Municipio } from 'src/app/modules/municipio/municipio';

@Component({
  selector: 'lib-zmat-lgrid-table',
  templateUrl: './zmat-lgrid-table.component.html',
  styleUrls: ['./zmat-lgrid-table.component.css']
})
export class ZmatLGridTableComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  @Input() schema: IZmatLGridSchema;
  @Input() data: any[];
  @Input() enableActions = true;
  @Input() showColumns: string[] = [];
  @Input() showFilters: string[] = [];

  @Output() selectionChanged: EventEmitter<any[]> = new EventEmitter();
  @Output() throwError: EventEmitter<any> = new EventEmitter();

  private $paginator: BehaviorSubject<ZmatLgridPagination>;

  public $pagination: BehaviorSubject<ZmatLgridPagination> = new BehaviorSubject<ZmatLgridPagination>(new ZmatLgridPagination());
  public pagination: ZmatLgridPagination;

  public $total = new BehaviorSubject<number>(null);

  public loading = false;

  public $selection = new BehaviorSubject<any[]>([]);
  public selection: any[] = [];

  constructor() { }

  ngOnInit(): void
  {
    if (this.showColumns.length) {
      this.schema.columns = this.schema.columns.filter(item => {
        return this.showColumns.includes(item.field);
      });
    }

    if (this.schema.pagination) {
      this.$paginator = new BehaviorSubject<ZmatLgridPagination>(ZmatLgridPagination.build(this.schema.pagination));
    } else {
      this.$paginator = new BehaviorSubject<ZmatLgridPagination>(new ZmatLgridPagination());
    }

    this.subscriptions.add(
      this.$paginator?.pipe(
        tap((zmatPagination) => {
          this.loading = true;
          this.pagination = zmatPagination;
        }),
        switchMap(zmatPagination => this.schema.service.paginate(zmatPagination, this.schema)),
        map(apiResponse => Municipio.parseResponse(apiResponse))
      ).subscribe(
        (parsedApiResponse) => {
          this.data = parsedApiResponse.data;
          this.$pagination.next(this.pagination);
          this.$total.next(parsedApiResponse.total);
          this.loading = false;
        }, (error) => {
          this.loading = false;
          this.throwError.emit(error);
        }
      )).add(
        this.$selection.subscribe(
          value => this.selectionChanged.emit(value)
        )
      );
  }

  pageChanged($event): void {
    this.pagination.page = $event;
    this.$paginator.next(this.pagination);
  }

  searchChanged($event): void {
    this.cleanSelection();
    this.pagination.page = 1;
    this.pagination.search = $event;
    this.$paginator.next(this.pagination);
  }

  private selectedOnPage(): any[] {
    return this.selection.filter(item => this.data.filter(itemA => item.equals(itemA)).length  === 1);
  }

  isAllSelected(): boolean {
    return this.data?.length > 0 &&
      this.selectedOnPage().length === this.data?.length;
  }

  isSomeSelected(): boolean {
    const countSelectedOnPage = this.selectedOnPage().length;
    return this.data?.length > 0 && countSelectedOnPage > 0 && countSelectedOnPage < this.data?.length;
  }

  isSelected(row): boolean {
    return this.selection.filter(item => item.equals(row)).length === 1;
  }

  toggle(row): void {
    if (this.isSelected(row)) {
      this.selection = this.selection.filter(item => !item.equals(row));
    } else {
      this.selection.push(row);
    }

    this.$selection.next(this.selection);
  }

  masterToggle(): void {
    this.isAllSelected() ?
        this.selection = this.selection.filter(item => this.data.filter(itemA => item.equals(itemA)).length === 0) :
        this.data.filter(item => !this.isSelected(item)).map(item => this.selection.push(item));

    this.$selection.next(this.selection);
  }

  cleanSelection(): void {
    this.selection = [];
    this.$selection.next(this.selection);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  orderBy(item: IZmatLGridColumnSchema): void
  {
    this.pagination.sortColumn = item.field;
    this.pagination.sortDirection = (this.pagination.sortDirection === 'asc') ? 'desc' : 'asc';
    this.$paginator.next(this.pagination);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
