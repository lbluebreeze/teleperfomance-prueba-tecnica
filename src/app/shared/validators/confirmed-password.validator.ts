import { FormGroup, ValidationErrors } from '@angular/forms';

/**
 * Validador personalizado que compara las contraseñas
 */
export function confirmedPasswordValidator(passwordControlKey: string, confirmPasswordControlKey: string): ValidationErrors | null {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const passwordControl = formGroup.controls[passwordControlKey];
    const confirmPasswordControl = formGroup.controls[confirmPasswordControlKey];

    const match = passwordControl.value === confirmPasswordControl.value;

    return !match ? { unConfirmedPassword: true } : null;
  };
}
