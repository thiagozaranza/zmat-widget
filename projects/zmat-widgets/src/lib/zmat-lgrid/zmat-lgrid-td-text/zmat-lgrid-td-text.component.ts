import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'zmat-lgrid-td-text',
  templateUrl: './zmat-lgrid-td-text.component.html',
  styleUrls: ['./zmat-lgrid-td-text.component.css']
})
export class ZmatLGridTdTextComponent {
  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;
  model: any;
  data: any;
}
