import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ApiModule } from 'src/apiAndObjects/api.module';
import { ComponentsModule } from 'src/components/components.module';
import { HomeRoutingModule } from './login-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, ComponentsModule, OAuthModule, ApiModule, MatButtonModule],
  declarations: [LoginPageComponent],
})
export class LoginModule {}
