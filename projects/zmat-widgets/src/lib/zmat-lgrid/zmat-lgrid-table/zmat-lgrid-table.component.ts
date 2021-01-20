import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GenericFacade } from '../../generic-facade';
import { Subscription } from 'rxjs';
import { ZmatLGridSchema, ZmatLGridColumnSchema } from '../zmat-lgrid.schema';
import { ZmatLgridPagination } from '../zmat-pagination.model';

@Component({
  selector: 'zmat-lgrid-table',
  templateUrl: './zmat-lgrid-table.component.html',
  styleUrls: ['./zmat-lgrid-table.component.css']
})
export class ZmatLGridTableComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  @Input() facade: GenericFacade;
  @Input() schema: ZmatLGridSchema;
  @Input() data: any[];
  @Input() enableActions: boolean = true;
  @Input() showColumns: string[] = [];
  @Input() showFilters: string[] = [];

  private pagination: ZmatLgridPagination;
  public loading: boolean = false;

  constructor() {
    
  }

  ngOnInit() 
  {
    if (this.showColumns.length)
      this.schema.columns = this.schema.columns.filter(item => { 
        return this.showColumns.includes(item.field);
      });

    this.subscriptions.add(
      this.facade.meta_data$.subscribe(value => {
        if (!value) return;
        this.pagination = value.request.query_params;
      }))
    .add(
      this.facade.loading$.subscribe(value => this.loading = value)
    );
  }

  selectItem(obj: any) {
    this.facade.select(obj.id);
  }

  orderBy(item: ZmatLGridColumnSchema) 
  {
    if (this.isDecrescentOrderedByField(item))
      this.pagination = {
        fetch_list: this.pagination.fetch_list,
        filter_list: this.pagination.filter_list,
        with_list: this.pagination.with_list,
        paginator: {
          limit: this.pagination.paginator.limit,
          order_by: null,
          page: this.pagination.paginator.page
        }
      };
    else if (this.isCrescentOrderedByField(item))  
      this.pagination = {
        fetch_list: this.pagination.fetch_list,
        filter_list: this.pagination.filter_list,
        with_list: this.pagination.with_list,
        paginator: {
          limit: this.pagination.paginator.limit,
          order_by: item.field + ',desc',
          page: this.pagination.paginator.page
        }
      };
    else 
      this.pagination = {
        fetch_list: this.pagination.fetch_list,
        filter_list: this.pagination.filter_list,
        with_list: this.pagination.with_list,
        paginator: {
          limit: this.pagination.paginator.limit,
          order_by: item.field + ',asc',
          page: this.pagination.paginator.page
        }
      };

    this.facade.paginate(this.pagination);
  } 

  isCrescentOrderedByField(item) {
    return this.pagination && (this.pagination.paginator.order_by == item.field + ',asc' || this.pagination.paginator.order_by == item.field);
  }

  isDecrescentOrderedByField(item) {
    return this.pagination && this.pagination.paginator.order_by == item.field + ',desc';
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
