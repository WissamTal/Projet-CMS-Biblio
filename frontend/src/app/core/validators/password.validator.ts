import { AbstractControl, ValidationErrors } from '@angular/forms';

export function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasDigit = /[0-9]/.test(value);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const isLongEnough = value.length >= 14;

  const valid = hasUpperCase && hasLowerCase && hasDigit && hasSymbol && isLongEnough;

  return valid ? null : {
    strongPassword: {
      hasUpperCase,
      hasLowerCase,
      hasDigit,
      hasSymbol,
      isLongEnough
    }
  };
}
