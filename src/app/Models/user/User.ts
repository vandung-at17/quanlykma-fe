import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export class UserModule {
  email: string;
  password: string;
  constructor(
    email: string,
    password: string) {
    this.email = email;
    this.password = password;
  }
}
