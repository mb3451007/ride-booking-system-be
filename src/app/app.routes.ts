import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './auth/user/user.component';
import { LoginComponent } from './auth/login/login.component';
import { register } from 'module';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: UserComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'register/user' }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
