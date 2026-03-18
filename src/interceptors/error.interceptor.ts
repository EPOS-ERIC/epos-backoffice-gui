/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, last } from 'rxjs/operators';
import { LogService } from 'src/services/log.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private logger: LogService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      last(),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          this.logger.warn('Client side error.');
          errorMsg = `Error: ${error.error.message}`;

          if (error.status === HttpStatusCode.NotFound) {
            this.router.navigate(['/not-found']);
          }
          // } else if (error.status === 0) {
          //   setTimeout(() => this.router.navigate(['/not-found']), 0);
          // }
        } else {
          this.logger.warn('Server side error.');
          errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;

          if (error.status == HttpStatusCode.InternalServerError) {
            // this.router.navigate(['/internal-server-error']);
          } else if (error.status === HttpStatusCode.Unauthorized) {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 500);
          }
        }
        return throwError(errorMsg);
      }),
    );
  }
}
