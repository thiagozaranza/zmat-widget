import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GenericFacade } from '../../generic-facade';
import { Subscription } from 'rxjs';
import { ZmatLgridPagination } from '../zmat-pagination.model';


@Component({
  selector: 'zmat-lgrid-pagination',
  templateUrl: './zmat-lgrid-pagination.component.html',
  styleUrls: ['./zmat-lgrid-pagination.component.css']
})
export class ZmatLGridPaginationComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  @Input() pagination: ZmatLgridPagination;
  @Input() facade: GenericFacade;  

  public from: number = null;
  public to: number = null;
  public total: number = null;
  private total_pages: number = null; 

  constructor() { }

  ngOnInit() 
  {
    this.subscriptions.add(      
      this.facade.meta_data$.subscribe(value => {
        if (!value) return;
        this.pagination = {... value.request.query_params};

        this.from = (this.pagination.paginator.page - 1) * this.pagination.paginator.limit + 1;
        this.to = (this.pagination.paginator.page) * this.pagination.paginator.limit;            
      })
    ).add(
      this.facade.total$.subscribe(value => {
        if (!value) return;
        this.total = value;

        if (this.pagination)
          this.total_pages = Math.ceil(this.total / this.pagination.paginator.limit);
      })
    );
  }

  firstPage()
  {
    this.pagination = {
      fetch_list: this.pagination.fetch_list,
      with_list: this.pagination.with_list,
      paginator: {
        page: 1,
        limit: this.pagination.paginator.limit,
        order_by: this.pagination.paginator.order_by
      },
      filter_list : this.pagination.filter_list
    }

    this.facade.paginate(this.pagination);
  }

  lastPage()
  {
    this.pagination = {
      fetch_list: this.pagination.fetch_list,
      with_list: this.pagination.with_list,
      paginator: {
        page: this.total_pages,
        limit: this.pagination.paginator.limit,
        order_by: this.pagination.paginator.order_by
      },
      filter_list : this.pagination.filter_list
    }

    this.facade.paginate(this.pagination);
  }

  private hasNextPage(): boolean
  {
    return this.pagination.paginator.page + 1 <= this.total_pages;
  }

  nextPage()
  {
    if (!this.hasNextPage())
      return;
        
    this.pagination = {
      fetch_list: this.pagination.fetch_list,
      with_list: this.pagination.with_list,
      paginator: {
        page: this.pagination.paginator.page + 1,
        limit: this.pagination.paginator.limit,
        order_by: this.pagination.paginator.order_by
      },
      filter_list : this.pagination.filter_list
    }

    this.facade.paginate(this.pagination);
  }

  private hasPreviousPage(): boolean
  {
    return this.pagination.paginator.page - 1 >= 1;
  }

  previousPage()
  {
    if (!this.hasPreviousPage())
      return;

    this.pagination = {
      fetch_list: this.pagination.fetch_list,
      with_list: this.pagination.with_list,
      paginator: {
        page: this.pagination.paginator.page - 1,
        limit: this.pagination.paginator.limit,
        order_by: this.pagination.paginator.order_by
      },
      filter_list : this.pagination.filter_list
    }

    this.facade.paginate(this.pagination);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
