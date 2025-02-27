import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import this

@Component({
  selector: 'app-passenger-registration',
  templateUrl: './passenger-registration.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./passenger-registration.component.css']
})
export class PassengerRegistrationComponent {
  passengerForm: FormGroup;
  paymentMethods = ['Credit Card', 'Debit Card', 'Digital Wallet', 'PayPal', 'Cash'];

  constructor(private fb: FormBuilder) {
    this.passengerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth: [''], // Optional field
      preferredPayment: [''],
      homeAddress: [''],
      workAddress: [''],
      frequentLocations: [''],
      accessibilityNeeds: ['']
    });
  }

  onSubmit() {
    if (this.passengerForm.valid) {
      console.log('Passenger Registration Data:', this.passengerForm.value);
      alert('Passenger Registered Successfully!');
      this.passengerForm.reset();
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
}
