import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-web-integration',
  templateUrl: './web-integration.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./web-integration.component.css']
})

export class WebIntegrationComponent {
  showForm = false;
  discounts = [
    { code: 'SAVE10', type: 'Percentage', value: '10%', expiry: '2025-12-31', conditions: 'Minimum purchase of $50' },
    { code: 'FIXED5', type: 'Fixed', value: '$5', expiry: '2025-11-30', conditions: 'Valid for first-time users' }
  ];

  newDiscountForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newDiscountForm = this.fb.group({
      startingAddress: [''],
      arrivalAddress: [''],
      dateTime: [''],
      babySeat: [false],
      waterBottle: [false],
      tripType: ['one-way'],
      price: [''],
      code: [''],
      type: ['percentage'],
      value: [''],
      expiry: [''],
      conditions: ['']
    });
  }

  addDiscount() {
    if (this.newDiscountForm.valid) {
      this.discounts.push(this.newDiscountForm.value);
      this.newDiscountForm.reset();
      this.showForm = false;
    }
  }

}
