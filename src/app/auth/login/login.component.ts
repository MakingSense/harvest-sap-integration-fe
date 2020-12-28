import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { AuthService } from '../../core/auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    const authenticateUrl = this.authService.getAuthenticateUrl();
    const callbackUrl = encodeURIComponent(environment.authCallbackUrl);

    this.document.location.href = `${authenticateUrl}?callbackUrl=${callbackUrl}`;
  }

}
