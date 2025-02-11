import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { BookingComponent } from './booking/booking.component';
import { SettingComponent } from './setting/setting.component';
import { ContactSupportComponent } from './contact-support/contact-support.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard], 
    children: [
      { path: 'booking', component: BookingComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'contact-support', component: ContactSupportComponent },
      { path: '', redirectTo: 'booking', pathMatch: 'full' } // Default route inside dashboard
    ] 
  },

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },  
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
