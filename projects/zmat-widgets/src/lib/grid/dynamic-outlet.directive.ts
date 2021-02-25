import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    Type,
    ViewContainerRef
} from '@angular/core';
import { IGridCellRender, IGridColumnSchema } from './grid.schema';

import { IModel } from '../service.schema';

// tslint:disable-next-line: directive-selector
@Directive({selector: '[dynamicOutlet]'})
export class DynamicOutletDirective<T extends IModel> implements OnChanges, OnDestroy {
  @Input() dynamicOutlet: Type<IGridCellRender<T>>;
  @Input() dynamicOutletSchema: IGridColumnSchema<T>;
  @Input() dynamicOutletData: T;

  private componentRef: ComponentRef<any> = null;

  constructor(private vcRef: ViewContainerRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.vcRef.clear();
    this.componentRef = null;

    if (this.dynamicOutlet) {
      const elInjector = this.vcRef.injector;
      const componentFactoryResolver = elInjector.get(ComponentFactoryResolver);

      const componentFactory = componentFactoryResolver.resolveComponentFactory(this.dynamicOutlet);
      this.componentRef = componentFactory.create(elInjector);

      this.componentRef.changeDetectorRef.detectChanges();
      this.componentRef.instance.schema = this.dynamicOutletSchema;
      this.componentRef.instance.data = this.dynamicOutletData;
      this.vcRef.createEmbeddedView(this.componentRef.instance.template, { $implicit: this.dynamicOutletSchema });
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.vcRef.clear();
      this.vcRef = null;
    }
  }
}
