import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

const passwordMatchValidator: ValidatorFn = (form) => {
  const password = form.get('password').value;
  const passwordConfirm = form.get('passwordConfirm').value;

  return password && passwordConfirm && password !== passwordConfirm
    ? { 'passwordsNotMatch': true }
    : null;
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
      'username': new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      'passwordConfirm': new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      'displayName': new FormControl(null, [
        Validators.required
      ])
    }, [
        passwordMatchValidator
      ]);
  }
}
