import { AbstractControl } from '@angular/forms';

interface RegistrationWarnings {
  strength: number;
}

export interface WarnableAbstractControl extends AbstractControl {
  warnings: RegistrationWarnings;
}
