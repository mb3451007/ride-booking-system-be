import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-discounts',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule here
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})

export class DiscountsComponent {
  showForm: boolean = false; // Controls form visibility
  discounts = [
    { code: 'SUMMER10', type: 'Percentage', value: '10%', expiry: '2025-06-30', conditions: 'Valid for summer collection' },
    { code: 'FLAT50', type: 'Fixed', value: '$50', expiry: '2025-07-15', conditions: 'Minimum purchase of $200' }
  ];

  newDiscountForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.newDiscountForm = this.fb.group({
      code: ['', Validators.required],
      type: ['percentage', Validators.required],
      value: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      expiry: ['', Validators.required],
      conditions: ['']
    });
  }

  // Toggle form visibility
  toggleForm() {
    this.showForm = !this.showForm;
  }

  // Add discount to the table
  addDiscount() {
    if (this.newDiscountForm.valid) {
      const newDiscount = this.newDiscountForm.value;
      this.discounts.push({
        ...newDiscount,
        value: newDiscount.type === 'percentage' ? `${newDiscount.value}%` : `$${newDiscount.value}`,
      });
      this.newDiscountForm.reset({ type: 'percentage' }); // Reset the form
      this.showForm = false; // Hide the form
    }
  }
}