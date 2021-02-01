import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'lib-zmat-lgrid-td-bool',
  templateUrl: './zmat-lgrid-td-bool.component.html',
  styleUrls: ['./zmat-lgrid-td-bool.component.css']
})
export class ZmatLGridTdBoolComponent {
  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;
  model: any;
  data: any;
}
