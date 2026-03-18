import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
  imports: [CommonModule, AngularMaterialModule, ErrorRoutingModule],
  declarations: [ErrorComponent],
})
export class ErrorModule {}
