import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './driver-registration.component.html',
  styleUrls: ['./driver-registration.component.css']
})

export class DriverRegisterComponent {

  step = 1;
  step1Form: FormGroup;
  step2Form: FormGroup;

  message: string = '';
  isError: boolean = false; 

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Step 1 Form
    this.step1Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      consent: [false, Validators.requiredTrue]
    });

    // Step 2 Form with enhanced validations
    this.step2Form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      company: [''],
      address: [''],
      subscription: ['monthly', Validators.required],
      
      // Card Number (16 digits)
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{16}$') // 16 digits only
        ]
      ],

      // Expiration Date (MM/YY format)
      expirationDate: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$') // MM/YY format
        ]
      ],

      // CVC (3 digits)
      cvc: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{3}$') // 3 digits only
        ]
      ],

      dataConsent: [false, Validators.requiredTrue],
      terms: [false, Validators.requiredTrue]
    });
  }

  nextStep() {
    this.step1Form.markAllAsTouched(); // Mark all controls as touched
    if (this.step === 1 && this.step1Form.valid) {
      this.step = 2;
    }
  }

  prevStep() {
    this.step = 1;
  }

  submitForm() {
    if (this.step1Form.valid && this.step2Form.valid) {
      const formData = { ...this.step1Form.value, ...this.step2Form.value };
      console.log(formData);
      this.authService.register(formData).subscribe(
        response => {
          console.log('Form submitted successfully:', response);
          this.showMessage('Form has been submitted successfully! Redirecting to login...', false);
          setTimeout(() => {
            this.router.navigate(['/login'])
            .then(() => {
              window.location.reload();
            });    
          }, 1000);
        },
        error => {
          console.error('Error submitting form:', error);
          this.showMessage('There was an error submitting the form...', true);
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  validateNumberInput(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
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