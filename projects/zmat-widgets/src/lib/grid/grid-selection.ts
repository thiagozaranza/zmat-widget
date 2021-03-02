import { GridSelectionModeType, IGridSchema } from './grid.schema';

import { BehaviorSubject } from 'rxjs';
import { IModel } from '../commons/service.schema';

export class GridSelection<T extends IModel> {

  public data: T[];

  public $selection = new BehaviorSubject<T[]>([]);
  public selection: T[] = [];

  public constructor(private schema: IGridSchema<T>) {

  }

  private selectedOnPage(): T[] {
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
    if (this.schema.selectionMode !== GridSelectionModeType.MULTI_SELECTION) {
      return;
    }
    if (this.isSelected(row)) {
      this.selection = this.selection.filter(item => !item.equals(row));
    } else {
      this.selection.push(row);
    }

    this.$selection.next(this.selection);
  }

  select(row): void {
    if (this.schema.selectionMode !== GridSelectionModeType.SINGLE_SELECTION) {
      return;
    }

    if (this.selection.length === 1 && this.selection[0].equals(row)) {
      this.selection = [];
    } else {
      this.selection = [row];
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
}
