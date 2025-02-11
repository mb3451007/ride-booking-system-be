import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  step = 1;
  step1Form: FormGroup;
  step2Form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Step 1 Form
    this.step1Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      consent: [false, Validators.requiredTrue]
    });

    // Step 2 Form
    this.step2Form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      company: [''],
      address: [''],
      subscription: ['monthly', Validators.required],
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvc: ['', Validators.required],
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
          alert('Form Submitted Successfully!');
        },
        error => {
          console.error('Error submitting form:', error);
          console.error('Error details:', error.error); // Log the error response
          alert('Error submitting form. Check the console for details.');
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }

}