import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, catchError, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Token expiré → on tente refresh
        if (error.status === 401 && !authReq.url.includes('/token/refresh')) {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const newToken = this.authService.getToken();
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              });
              return next.handle(retryReq);
            }),
            catchError(() => {
              this.authService.logout();  // Token non valide → logout
              return throwError(() => error);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
