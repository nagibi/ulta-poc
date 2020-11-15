import { ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';

export const campoDinamicoValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
      return {campoDinamico: true};
  };
