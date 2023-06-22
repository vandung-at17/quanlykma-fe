import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserModule } from '../../Models/user/User';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public email: string='';
  public password : string ='';
  public accessToken:string | undefined;
  public error:string ='';
  public loading = false;

  constructor(private loginService :LoginService, private router: Router, private authService: AuthService){};

  public ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  public submitForm(form:NgForm): void{
    // console.log(this.email);
    // console.log(this.password);
    const user : UserModule ={
      email: this.email,
      password: this.password
    };
    console.log(user);
    this.loginService.loginUser(user).subscribe((res: any) => {
      console.log('thêm sinh viên thành công');
      console.log(res);
      this.authService.setToken(res.jwttoken);
      this.authService.setRole(res.code);
      this.router.navigate(['/home']);
    });
  }
}
