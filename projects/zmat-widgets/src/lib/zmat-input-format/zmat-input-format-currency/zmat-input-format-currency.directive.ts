import {
  AfterViewInit,
  Directive,
  DoCheck,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
  Optional
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { CurrencyFormatConfig, CURRENCY_MASK_CONFIG } from './zmat-input-format-currency.config';
import { ZmatInputFormatCurrencyHandler } from './zmat-input-format-currency.handler';

export const CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ZmatInputFormatCurrencyDirective),
    multi: true
};

@Directive({
    selector: '[libZmatCurrencyFormat]',
    providers: [
        CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR,
        { provide: NG_VALIDATORS, useExisting: ZmatInputFormatCurrencyDirective, multi: true }
    ]
})
export class ZmatInputFormatCurrencyDirective implements AfterViewInit, ControlValueAccessor, DoCheck, OnInit, Validator {

    @Input() max: number;
    @Input() min: number;
    @Input() options: any = {};

    inputHandler: ZmatInputFormatCurrencyHandler;
    keyValueDiffer: KeyValueDiffer<any, any>;

    optionsTemplate = {
        align: 'right',
        allowNegative: true,
        decimal: '.',
        precision: 2,
        prefix: '$ ',
        suffix: '',
        thousands: ','
    };

    constructor(@Optional() @Inject(CURRENCY_MASK_CONFIG) private currencyFormatConfig: CurrencyFormatConfig,
                private elementRef: ElementRef,
                private keyValueDiffers: KeyValueDiffers) {
        if (currencyFormatConfig) {
            this.optionsTemplate = currencyFormatConfig;
        }

        this.keyValueDiffer = keyValueDiffers.find({}).create();
    }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.style.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
    }

    ngDoCheck(): void {
        if (this.keyValueDiffer.diff(this.options)) {
            this.elementRef.nativeElement.style.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
            this.inputHandler.updateOptions((Object as any).assign({}, this.optionsTemplate, this.options));
        }
    }

    ngOnInit(): void {
        this.inputHandler = new ZmatInputFormatCurrencyHandler(this.elementRef.nativeElement,
          (Object as any).assign({}, this.optionsTemplate, this.options));
    }

    @HostListener('blur', ['$event'])
    handleBlur(event: any): void {
        this.inputHandler.getOnModelTouched().apply(event);
    }

    @HostListener('click', ['$event'])
    handleClick(event: any): void {
        this.inputHandler.handleClick(event, this.isChromeAndroid());
    }

    @HostListener('cut', ['$event'])
    handleCut(event: any): void {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleCut(event);
        }
    }

    @HostListener('input', ['$event'])
    handleInput(event: any): void {
        if (this.isChromeAndroid()) {
            this.inputHandler.handleInput(event);
        }
    }

    @HostListener('keydown', ['$event'])
    handleKeydown(event: any): void {
      if (!this.isChromeAndroid()) {
          this.inputHandler.handleKeydown(event);
      }
    }

    @HostListener('keypress', ['$event'])
    handleKeypress(event: any): void {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleKeypress(event);
        }
    }

    @HostListener('keyup', ['$event'])
    handleKeyup(event: any): void {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleKeyup(event);
        }
    }

    @HostListener('paste', ['$event'])
    handlePaste(event: any): void {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handlePaste(event);
        }
    }

    isChromeAndroid(): boolean {
        return /chrome/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent);
    }

    registerOnChange(callbackFunction: () => void): void {
        this.inputHandler.setOnModelChange(callbackFunction);
    }

    registerOnTouched(callbackFunction: () => void): void {
        this.inputHandler.setOnModelTouched(callbackFunction);
    }

    setDisabledState(value: boolean): void {
        this.elementRef.nativeElement.disabled = value;
    }

    validate(abstractControl: AbstractControl): { [key: string]: any; } {
        const result: any = {};

        if (abstractControl.value > this.max) {
            result.max = true;
        }

        if (abstractControl.value < this.min) {
            result.min = true;
        }

        return result !== {} ? result : null;
    }

    writeValue(value: number): void {
        this.inputHandler.setValue(value);
    }
}
