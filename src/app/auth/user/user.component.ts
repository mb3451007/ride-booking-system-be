import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
  step = 1;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      step1: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        consent: [false, Validators.requiredTrue],
      }),
      step2: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        company: ['', Validators.required],
        address: ['', Validators.required],
        subscription: ['monthly', Validators.required],
        cardNumber: ['', Validators.required],
        expirationDate: ['', Validators.required],
        cvc: ['', Validators.required],
        dataConsent: [false, Validators.requiredTrue],
        terms: [false, Validators.requiredTrue],
      }),
    });
  }

   step1Form(): FormGroup {
    return this.form.get('step1') as FormGroup;
  }

   step2Form(): FormGroup {
    return this.form.get('step2') as FormGroup;
  }

  nextStep() {
    if (this.step === 1 && this.step1Form().valid) {
      this.step = 2;
    }
  }

  prevStep() {
    this.step = 1;
  }

  submitForm() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
      alert('Form Submitted Successfully!');
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
