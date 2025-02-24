import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverRegisterComponent } from './auth/driver-registration/driver-registration.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { BookingComponent } from './booking/booking.component';
import { ContactSupportComponent } from './contact-support/contact-support.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { WebIntegrationComponent } from './web-integration/web-integration.component';
import { SurchargeComponent } from './surcharge/surcharge.component';
import { PackagesComponent } from './packages/packages.component';
import { OptionsComponent } from './options/options.component';
import { BookingFormComponent } from './booking-form/booking-form.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/driver-register', component: DriverRegisterComponent },
  { path: 'booking-form', component: BookingFormComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard], 
    children: [
      { path: 'booking', component: BookingComponent, data: { title: 'Bookings' } },
      { path: 'contact-support', component: ContactSupportComponent, data: { title: 'Contact Support' } },
      { path: 'discounts', component: DiscountsComponent, data: { title: 'Discounts' } },
      { path: 'vehicles', component: VehiclesComponent, data: { title: 'Vehicles' } },
      { path: 'surcharge', component: SurchargeComponent, data: { title: 'Surcharge' } },
      { path: 'web-integration', component: WebIntegrationComponent, data: { title: 'Web Integration' } },
      { path: 'options', component: OptionsComponent, data: { title: 'Options' } },
      { path: 'packages', component: PackagesComponent, data: { title: 'Packages' } },
      { path: '', redirectTo: 'booking', pathMatch: 'full' }
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
