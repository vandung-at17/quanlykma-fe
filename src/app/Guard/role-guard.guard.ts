import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

    const userRole = this.authService.getRole();// Lấy vai trò của người dùng từ nguồn dữ liệu (Service hoặc API)
    if (route.data['roles'] && route.data['roles'].indexOf(userRole) === -1) {
      return this.router.parseUrl('/access-denied');
    }
    return true;
  }
}
