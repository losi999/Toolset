import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import LoginRequest from 'src/app/auth/types/LoginRequest';
import LoginResponse from 'src/app/auth/types/LoginResponse';
import RegistrationRequest from 'src/app/auth/types/RegistrationRequest';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(user: LoginRequest) {
    return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/login`, user);
  }

  registration(user: RegistrationRequest) {
    return this.httpClient.post(`${environment.apiUrl}/registration`, user);
  }
}
