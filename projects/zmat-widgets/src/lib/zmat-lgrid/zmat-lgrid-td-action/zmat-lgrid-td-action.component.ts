import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'zmat-lgrid-td-action',
  templateUrl: './zmat-lgrid-td-action.component.html',
  styleUrls: ['./zmat-lgrid-td-action.component.css']
})
export class ZmatLGridTdActionComponent {
  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;
  model: any;
  data: any;
}
