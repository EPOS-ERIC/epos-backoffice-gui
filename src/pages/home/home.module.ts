import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ApiModule } from 'src/apiAndObjects/api.module';
import { ComponentsModule } from 'src/components/components.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SkeletonLoaderComponent } from 'src/components/skeleton-loader/skeleton-loader.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
    OAuthModule,
    ApiModule,
    NgScrollbarModule,
    SkeletonLoaderComponent,
  ],
  providers: [],
})
export class HomeModule {}
