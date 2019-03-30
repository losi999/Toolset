import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '@/app/auth/auth.service';

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
    this.form.markAsTouched();

    if (this.form.valid) {
      this.authService.login({
        username: this.username.value,
        password: this.password.value
      })
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: () => {
            this.form.setErrors({
              invalidLogin: true
            });
          }
        });
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, {
        validators: [
          Validators.required
        ],
        updateOn: 'submit'
      }
      ),
      password: new FormControl(null,
        {
          validators: [
            Validators.required
          ],
          updateOn: 'submit'
        })
    });
  }
}
