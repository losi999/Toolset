import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@/environments/environment';
import LoginRequest from '@/app/auth/types/LoginRequest';
import LoginResponse from '@/app/auth/types/LoginResponse';
import RegistrationRequest from '@/app/auth/types/RegistrationRequest';

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
