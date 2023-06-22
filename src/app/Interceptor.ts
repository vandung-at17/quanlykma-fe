import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './Services/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Interceptor');
    //const token = this.authService.getToken();
    // const headers = new HttpHeaders()
    //   // .set('access-token', 'Bearer ' + token)
    //   .set('Content-Type', 'application/json')
    //   .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkdW5nc29uZ29rdTNAZ21haWwuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSx7ImF1dGhvcml0eSI6IlJPTEVfU1RVREVOVCJ9XSwiaWF0IjoxNjg3MzEwNjczLCJleHAiOjE2ODczMjg2NzN9.er8cmpWV4As_jB6hQ6REdJ82xt73S1qc5zdD7TUOuQPZdTJSVFVlJVVmU999A_LVh7622awRmxgdjaw1CqAcdw');
    // const AuthRequest = request.clone({ headers: headers });
    // return next.handle(AuthRequest);
    const token = this.authService.getToken();

        // Kiểm tra xem token có tồn tại hay không
        if (token) {
          const modifiedRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });

          return next.handle(modifiedRequest);
        } else {
          return next.handle(request);
        }
  }
}
