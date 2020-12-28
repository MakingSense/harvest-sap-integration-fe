import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService({
    tokenGetter: () => {
      return this.token;
    }
  });

  constructor() { }

  get token(): string {
    return localStorage.getItem('token');
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    try {
      return ! this.jwtHelper.isTokenExpired();
    } catch (error) {
      return false;
    }
  }

  getAuthenticateUrl(): string {
    return `${environment.apiBaseUrl}/harvest/authenticate`;
  }
}
