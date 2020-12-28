import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  CanActivateChild,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    return this.checkLogin();
  }

  canLoad(): boolean {
    return this.checkLogin();
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

  private checkLogin(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    if (! isAuthenticated) {
      this.router.navigate([ '/auth/login' ]);
    }

    return isAuthenticated;
  }
}
