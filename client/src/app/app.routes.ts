import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './auth/user/user.component';
import { LoginComponent } from './auth/login/login.component';
import { register } from 'module';

export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent},
    { path: 'auth/register', component: UserComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth/register' }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
