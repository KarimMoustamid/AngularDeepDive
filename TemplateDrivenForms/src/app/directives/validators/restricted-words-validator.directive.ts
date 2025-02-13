import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
    selector: '[restrictedWords]',
    standalone: true,
    providers: [{
        provide: NG_VALIDATORS,
        multi: true,
        useExisting: RestrictedWordsValidator,
    }],
})


export class RestrictedWordsValidator implements Validator {

    @Input('restrictedWords') restrictedWords: string[] = [];

    validate(control: AbstractControl): ValidationErrors | null {
        if (!control.value) return null;
        var invalidWords = this.restrictedWords
            .map(w => control.value.includes(w) ? w : null)
            .filter(w => w !== null);

       return invalidWords.length > 0
            ? {restrictedWords: invalidWords.join(',')}
            : null;
    }
}