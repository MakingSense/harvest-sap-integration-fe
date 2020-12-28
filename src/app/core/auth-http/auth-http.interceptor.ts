import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get token
    const token = this.authService.token;

    // Inject token on request
    const authReq = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}
