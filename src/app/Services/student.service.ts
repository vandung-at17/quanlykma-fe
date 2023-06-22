import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, count, throwError } from 'rxjs';
import { Student } from '../Models/Student';
import { retry, catchError, delay, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private REST_API_SERVER = 'http://localhost:8080';

  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     //'Content-Type': 'multipart/form-data', // Set the content type as multipart/form-data
  //     Authorization:
  //       'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkdW5nc29uZ29rdTNAZ21haWwuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfU1RVREVOVCJ9XSwiaWF0IjoxNjg3MzYxMDM0LCJleHAiOjE2ODczNzkwMzR9.WQLOGvqfwaNJF8_dHjUTTmF507taDUeR0aTihluTlIKQMZdH1sQx0W3J5TW23ZixAcA_36gzfmOgML2Z5hfBvg',
  //   }),
  // };

  constructor(private httpClient: HttpClient) {}

  public getAllStudent(): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/student`;
    return this.httpClient.get<any>(url).pipe(catchError(this.handleError));
  }

  public getTotalItem(): Observable<number> {
    const url = `${this.REST_API_SERVER}/api/student/totalItem`;
    return this.httpClient.get<number>(url).pipe(catchError(this.handleError));
  }

  public getStudent(studentId: number): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/student/detail?id=` + studentId;
    return this.httpClient.get<any>(url).pipe(catchError(this.handleError));
  }

  public addNewStudent(student: Student): Observable<Object> {
    const url = `${this.REST_API_SERVER}/api/student`;
    return this.httpClient
      .post<any>(url, student)
      .pipe(catchError(this.handleError));
  }

  public updateOldStudent(student: Student): Observable<Object> {
    const url = `${this.REST_API_SERVER}/api/student`;
    return this.httpClient
      .put<any>(url, student)
      .pipe(catchError(this.handleError));
  }

  public addStudent(formData: FormData): Observable<Object> {
    const url = `${this.REST_API_SERVER}/api/student/image`;
    return this.httpClient
      .post<any>(url, formData)
      .pipe(catchError(this.handleError));
  }

  public updateStudent(formData: FormData): Observable<Object> {
    const url = `${this.REST_API_SERVER}/api/student/image`;
    return this.httpClient
      .put<any>(url, formData)
      .pipe(catchError(this.handleError));
  }

  public getImageStudent(): Promise<string> {
    const url = 'http://localhost:8080/loadImage?imageName=1-43.jpg';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'blob',
      //Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaW5oQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1RFQUNIRVIifV0sImlhdCI6MTY4NzM5OTU1NiwiZXhwIjoxNjg3NDE3NTU2fQ.CljsfPbGAPhBk1MN6blZxnhcI0U2L5qAkQMgi_xAjPy5ST5z8DBlZWWbNSkXLXLhVugotAvYqE7DV8TVxbt8sw'
    });

    return this.httpClient
      .get(url, { headers, responseType: 'blob' })
      .toPromise()
      .then((response: Blob | undefined) => {
        if (response) {
          const imageUrl = URL.createObjectURL(response);
          return imageUrl;
        } else {
          throw new Error('Invalid image response');
        }
      });
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // Client-side errors
      console.error('An error occurred:', error.error.message);
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // Server-side errors
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // return an observable with a user-facing error message
    // window.alert(errorMessage);
    console.log('Error', 'Somethin happened; please try again later.');
    return throwError(errorMessage);
  }
}
