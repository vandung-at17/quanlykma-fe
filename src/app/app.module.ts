import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MainFooterComponent } from './Components/main-footer/main-footer.component';
import { MainNavicationComponent } from './Components/main-navication/main-navication.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { MainSidebarComponent } from './Components/main-sidebar/main-sidebar.component';
import { TablesComponent } from './Components/tables/tables.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

import { JwtModule } from '@auth0/angular-jwt';

import { AddStudentComponent } from './Components/add-student/add-student.component';
import { Interceptor } from './Interceptor';
import { UpdateStudentComponent } from './Components/update-student/update-student.component';
import { DecentralizationComponent } from './Components/decentralization/decentralization.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainFooterComponent,
    MainNavicationComponent,
    MainLayoutComponent,
    MainSidebarComponent,
    TablesComponent,
    AddStudentComponent,
    UpdateStudentComponent,
    DecentralizationComponent,
  ],
  imports: [
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        },
      },
    }),
    NzPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
