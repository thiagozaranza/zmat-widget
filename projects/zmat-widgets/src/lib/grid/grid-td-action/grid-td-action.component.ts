import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'lib-grid-td-action',
  templateUrl: './grid-td-action.component.html',
  styleUrls: ['./grid-td-action.component.css']
})
export class GridTdActionComponent {
  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;
  model: any;
  data: any;
}
