import { ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';

  export const confirmarSenhaValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    if (formGroup.get('senha').value === formGroup.get('confirmarSenha').value)
      return null;
    else
      return {senhaMismatch: true};
  };
