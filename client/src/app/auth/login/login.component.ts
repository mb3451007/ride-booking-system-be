import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    // Send login data to the backend API
    this.http.post(`${environment.apiBaseUrl}/api/login`, loginData).subscribe(
      (response: any) => {
        if (response.success) {
          // If the login is successful, redirect or perform other actions
          console.log('User logged in successfully', response);
        } else {
          // Handle error if user does not exist or credentials are incorrect
          console.log('Login failed', response.message);
        }
      },
      (error) => {
        console.error('Error logging in', error);
      }
    );
  }
}
