import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [LoginComponent, CallbackComponent, LogoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
