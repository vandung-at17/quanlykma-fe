import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserModule } from '../Models/user/User';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private REST_API_SERVER = 'http://localhost:8080';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data', // Set the content type as multipart/form-data
    }),
  };
  constructor(private httpClient: HttpClient) { }
  public loginUser(user:UserModule): Observable<Object>{
    const url = `${this.REST_API_SERVER}/login`;
    console.log(user)
    return this.httpClient.post<any>(url,user);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
