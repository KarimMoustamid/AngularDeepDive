import {Directive, ElementRef, forwardRef, HostListener, Provider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {formatDate} from "@angular/common";

// Note : use forwardRef() to solve : Class DateValueAccessorDirective used before its declaration.
const DATE_VALUE_PROVIDER: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateValueAccessorDirective),
    multi: true,
}

@Directive({
    selector: 'input([type=date])[ngModel],input([type=date])[formControlName],input([type=date])[formControl]',
    standalone: true,
    providers: [DATE_VALUE_PROVIDER]
})
export class DateValueAccessorDirective implements ControlValueAccessor {

    constructor(private element: ElementRef) {
    }

    @HostListener('input', ['$event.target.valueAsDate']) private onChange!: Function;

    registerOnChanged(fn: Function): void {
        this.onChange = (valueAsDate: Date) => {
            fn(valueAsDate);
        };
    }

    writeValue(newValue: any): void {
        if (newValue instanceof Date)
            this.element.nativeElement.value = formatDate(newValue, 'yyyy-MM-dd', 'en-US');
    }

    registerOnChange(fn: any): void {
        throw new Error('Method not implemented.');
    }

    registerOnTouched(fn: any): void {
        throw new Error('Method not implemented.');
    }

    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }

}