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

  @Output() throwError: EventEmitter<any> = new EventEmitter();

  private $paginator: BehaviorSubject<ZmatLgridPagination>;

  public $pagination = new BehaviorSubject<ZmatLgridPagination>(new ZmatLgridPagination());
  public pagination: ZmatLgridPagination;

  public $total = new BehaviorSubject<number>(null);

  public loading = false;

  constructor() {
  }

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
      ));
  }

  pageChanged($event): void {
    this.pagination.page = $event;
    this.$paginator.next(this.pagination);
  }

  searchChanged($event): void {
    this.pagination.search = $event;
    this.$paginator.next(this.pagination);
  }

  selectItem(obj: any): void {
    //this.facade.select(obj.id);
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
