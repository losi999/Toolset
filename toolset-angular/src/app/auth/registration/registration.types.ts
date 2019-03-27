import { AbstractControl } from '@angular/forms';

interface RegistrationWarnings {
  strength: 'weak' | 'medium';
}

export interface WarnableAbstractControl extends AbstractControl {
  warnings: RegistrationWarnings;
}
