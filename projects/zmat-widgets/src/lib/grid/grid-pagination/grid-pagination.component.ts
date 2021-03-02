import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IGridSchema } from '../grid.schema';
import { IModel } from '../../commons/service.schema';
import { Paginator } from '../../commons/paginator';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'lib-grid-pagination',
  templateUrl: './grid-pagination.component.html',
  styleUrls: ['./grid-pagination.component.css']
})
export class GridPaginationComponent<T extends IModel> implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  @Input() schema: IGridSchema<T>;
  @Input() $total: Observable<number>;
  @Input() $pagination: Observable<Paginator<T>>;
  @Input() $selection: Observable<T[]>;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @Output() limitChanged: EventEmitter<number> = new EventEmitter();
  @Output() selectionCleaned: EventEmitter<number> = new EventEmitter();

  public pagination: Paginator<T>;
  public total: number;
  public from: number = null;
  public to: number = null;
  public totalPages: number = null;
  public selectedLimit: number = null;

  ngOnInit(): void {
    this.subscriptions.add(
      this.$pagination?.pipe(
        filter(p => p !== null)
      ).subscribe(value => {
        this.selectedLimit = this.pagination?.limit;
        this.totalPages = Math.ceil(this.total / value.limit);
        this.pagination = value;
        this.from = (value.page - 1) * value.limit + 1;
      })
    ).add(
      this.$total?.pipe(
        filter(t => t !== null)
      ).subscribe(value => {
        this.total = value;
        this.totalPages = Math.ceil(this.total / this.pagination.limit);

        const to = this.pagination.page * this.pagination.limit;
        this.to = (to > this.total) ? this.total : to;
      })
    );
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

  cleanSelected(): void
  {
    this.selectionCleaned.emit();
  }

  changeLimit(): void
  {
    this.limitChanged.emit(this.selectedLimit);
  }
}
