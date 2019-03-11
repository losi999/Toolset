import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { WarnableAbstractControl } from './registration.types';

const passwordMatchValidator: ValidatorFn = (form) => {
  const password = form.get('password').value;
  const passwordConfirm = form.get('passwordConfirm').value;

  return password && passwordConfirm && password !== passwordConfirm
    ? { passwordsNotMatch: true }
    : null;
};

const passwordStrengthValidator: ValidatorFn = (control: WarnableAbstractControl) => {
  control.warnings = null;
  if (!control.value || control.value.length < 4) {
    return null;
  }
  if (control.value.length < 6) {
    control.warnings = { strength: 1 };
    return null;
  }

  if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/.test(control.value)) {
    control.warnings = { strength: 2 };
    return null;
  }
  return null;
};

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService) { }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get displayName() {
    return this.form.get('displayName');
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.registration({
        username: this.username.value,
        password: this.password.value,
        displayName: this.displayName.value
      })
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(4),
        ],
        updateOn: 'change'
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(4),
          passwordStrengthValidator
        ],
        updateOn: 'change'
      }),
      passwordConfirm: new FormControl(null),
      displayName: new FormControl(null, {
        validators: [
          Validators.required
        ],
        updateOn: 'change'
      })
    }, {
        validators: [
          passwordMatchValidator
        ],
        updateOn: 'change'
      });
  }
}
