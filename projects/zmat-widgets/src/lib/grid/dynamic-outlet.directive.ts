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

@Directive({selector: '[dynamicOutlet]'})
export class DynamicOutletDirective implements OnChanges, OnDestroy {
  @Input() dynamicOutlet: Type<any>;
  @Input() dynamicOutletModel: any;
  @Input() dynamicOutletData: any;

  private componentRef: ComponentRef<any> = null;

  constructor(private vcRef: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.vcRef.clear();
    this.componentRef = null;

    if (this.dynamicOutlet) {
      const elInjector = this.vcRef.parentInjector;
      const componentFactoryResolver = elInjector.get(ComponentFactoryResolver);

      const componentFactory = componentFactoryResolver.resolveComponentFactory(this.dynamicOutlet);
      this.componentRef = componentFactory.create(elInjector);

      this.componentRef.changeDetectorRef.detectChanges();
      this.componentRef.instance.model = this.dynamicOutletModel;
      this.componentRef.instance.data = this.dynamicOutletData;
      this.vcRef.createEmbeddedView(this.componentRef.instance.template, { $implicit: this.dynamicOutletModel });
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.vcRef.clear();
      this.vcRef = null;
    }
  }
}
