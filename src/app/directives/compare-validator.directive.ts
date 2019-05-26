import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';

//par TS => compare='nom attribut'
export function compareValidator(controlNameToCompare: string): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
        if (c.value === null || c.value.length === 0) {
            return null; // don't validate empty value
        }
        const controlToCompare = c.root.get(controlNameToCompare);
        if (controlToCompare) {
            const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
                c.updateValueAndValidity();
                subscription.unsubscribe();
            });
        }
        return controlToCompare && controlToCompare.value !== c.value ? { 'compare': true } : null;
    };
}

// @Directive({
//     selector: '[compare]',
//     providers: [{ provide: NG_VALIDATORS, useExisting: CompareValidatorDirective, multi: true }]
// })
//   //par html => compare='nom attribut'
//  export class CompareValidatorDirective implements Validator {
//     @Input('compare') controlNameToCompare: string;

//     validate(c: AbstractControl): ValidationErrors | null {
//         if (c.value === null || c.value.length === 0) {
//             return null; //
//         }
//         const controlToCompare = c.root.get(this.controlNameToCompare);
//         if (controlToCompare) {
//             const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
//                 c.updateValueAndValidity();
//                 subscription.unsubscribe();
//             });
//         }
//         return controlToCompare && controlToCompare.value !== c.value ? { 'compare': true } : null;

//      }
// }
