import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'lib-grid-td-bool',
  templateUrl: './grid-td-bool.component.html',
  styleUrls: ['./grid-td-bool.component.css']
})
export class GridTdBoolComponent {
  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;
  model: any;
  data: any;
}
