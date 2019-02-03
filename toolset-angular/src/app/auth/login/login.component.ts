import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService) { }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login({
        username: this.username.value,
        password: this.password.value
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
        (control) => {
          const warning = Validators.minLength(6)(control);
          if (warning) {
            (control as any).warnings = warning;
          }
          return null;
        }
      ]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }
}
