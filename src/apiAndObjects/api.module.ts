import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiService } from '../apiAndObjects/api/api.service';

@NgModule({ declarations: [],
    exports: [], imports: [CommonModule], providers: [ApiService, provideHttpClient(withInterceptorsFromDi())] })
export class ApiModule {}
