import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {LoginComponent} from '../Components/login/login.component'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  private token: string | null;
  private role: string | null;

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public removeToken() {
    localStorage.removeItem('token');
  }

  public getToken() {
    this.token = localStorage.getItem('token');
    return this.token;
  }

  public setRole(role: string) {
    this.role = role;
    localStorage.setItem('role', role);
  }

  public removeRole() {
    localStorage.removeItem('role');
  }

  public getRole() {
    this.role = localStorage.getItem('role');
    return this.role;
  }

  public isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
