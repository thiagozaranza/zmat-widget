import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IZmatLGridSchema, ZmatLgridPagination } from '../zmat-lgrid.schema';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'lib-zmat-lgrid-pagination',
  templateUrl: './zmat-lgrid-pagination.component.html',
  styleUrls: ['./zmat-lgrid-pagination.component.css']
})
export class ZmatLGridPaginationComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  @Input() schema: IZmatLGridSchema;
  @Input() $total: Observable<number>;
  @Input() $pagination: Observable<ZmatLgridPagination>;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  public pagination: ZmatLgridPagination;
  public total: number;
  public from: number = null;
  public to: number = null;
  public totalPages: number = null;

  constructor() {

  }

  ngOnInit(): void {
    this.$pagination?.subscribe(value => {
      if (!value) {
        return;
      }
      this.totalPages = Math.ceil(this.total / value.limit);
      this.pagination = value;
      this.from = (value.page - 1) * value.limit + 1;
      this.to = (value.page) * value.limit;
    });

    this.$total?.subscribe(value => {
      if (!value) {
        return;
      }
      this.total = value;
      this.totalPages = Math.ceil(this.total / this.pagination.limit);
    });
  }

  nextPage(): void {
    this.pageChanged.emit(this.pagination.page + 1);
  }

  firstPage(): void
  {
    this.pageChanged.emit(1);
  }

  lastPage(): void {
    this.pageChanged.emit(this.totalPages);
  }

  hasNextPage(): boolean
  {
    return this.pagination.page + 1 <= this.totalPages;
  }

  hasPreviousPage(): boolean
  {
    return this.pagination.page - 1 >= 1;
  }

  previousPage(): void {
    this.pageChanged.emit(this.pagination.page - 1);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
