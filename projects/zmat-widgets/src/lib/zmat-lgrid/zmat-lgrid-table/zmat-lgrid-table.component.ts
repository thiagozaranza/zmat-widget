import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IZmatLGridColumnSchema, IZmatLGridSchema, IZmatLgridPagination, ZmatLgridPagination } from '../zmat-lgrid.schema';
import { map, tap } from 'rxjs/operators';

import { Municipio } from 'src/app/modules/municipio/municipio';
import { ZmatLgridPaginator } from 'zmat-widgets';

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

  public $pagination = new BehaviorSubject<ZmatLgridPagination>(new ZmatLgridPagination());
  private pagination: ZmatLgridPagination;

  public loading = false;
  public total = 0;

  constructor() {

  }

  ngOnInit(): void
  {
    if (this.showColumns.length) {
      this.schema.columns = this.schema.columns.filter(item => {
        return this.showColumns.includes(item.field);
      });
    }

    this.request(ZmatLgridPagination.build(this.schema.pagination));
  }

  public request(pagination: ZmatLgridPagination): void {

    this.pagination = pagination;
    this.loading = true;

    this.subscriptions.add(
      this.schema.service.paginate(pagination, this.schema).pipe(
          map(response => Municipio.parseResponse(response))
      ).subscribe(a => {
        this.data = a.data;
        this.total = a.total;
        this.$pagination.next(this.pagination);
        this.loading = false;
      }));
  }

  pageChanged($event): void {
    this.pagination.page = $event;
    this.request(this.pagination);
  }

  selectItem(obj: any): void {
    //this.facade.select(obj.id);
  }

  orderBy(item: IZmatLGridColumnSchema): void
  {
    this.pagination.sortColumn = item.field;
    this.pagination.sortDirection = (this.pagination.sortDirection === 'asc') ? 'desc' : 'asc';
    this.request(this.pagination);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
