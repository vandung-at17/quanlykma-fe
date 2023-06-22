import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { TablesComponent } from './Components/tables/tables.component';
import { AddStudentComponent } from './Components/add-student/add-student.component';
import { UpdateStudentComponent } from './Components/update-student/update-student.component';
import { DecentralizationComponent } from './Components/decentralization/decentralization.component';
import { RoleGuard } from './Guard/role-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'addstudent', component: AddStudentComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_TEACHER'] } },
      { path: 'updatestudent/:id', component: UpdateStudentComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_TEACHER'] }},
      { path: 'access-denied', component: DecentralizationComponent},
    ],
  },
  { path: '', component: MainLayoutComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'tables', component: TablesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
