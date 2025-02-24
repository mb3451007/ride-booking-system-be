import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as bootstrap from 'bootstrap';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true, // Standalone component
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string = ''; // Message for both success & error
  isError: boolean = false; // Differentiate success/error messages

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(credentials).subscribe(
      (response: any) => {
        if (response.success) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('drivers_id', response.drivers_id);
          this.showMessage('Login successful! Redirecting...', false);

          // Trigger change detection manually
          this.cdr.detectChanges();

          setTimeout(() => {
            this.router.navigate(['/dashboard'])
            .then(() => {
              window.location.reload();
            });    
          }, 1000);
        } else {
          this.showMessage('Incorrect email or password. Please try again.', true);
        }
      },
      (error) => {
        this.showMessage('Incorrect email or password. Please try again.', true);
      }
    );
  }

  showMessage(message: string, isError: boolean) {
    this.message = message;
    this.isError = isError;
    const modalElement = document.getElementById('messageModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
