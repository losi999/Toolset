import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from '@/app/auth/login/login.component';
import { RegistrationComponent } from '@/app/auth/registration/registration.component';
import { AuthService } from '@/app/auth/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    LoginComponent,
    RegistrationComponent
  ]
})
export class AuthModule { }
