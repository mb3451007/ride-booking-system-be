import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DiscountsService } from '../services/discounts.service';// Import DiscountService

@Component({
  selector: 'app-discounts',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {
  showForm: boolean = false;
  discounts: any[] = [];
  newDiscountForm!: FormGroup;
  driversId: string | null = null;

  constructor(private fb: FormBuilder, private discountService: DiscountsService) {

  }

  ngOnInit(): void {
    this.driversId = localStorage.getItem('drivers_id'); // Retrieve driversId from localStorage
    console.log("Driver ID:", this.driversId); // Debugging

    this.newDiscountForm = this.fb.group({
      code: ['', Validators.required],
      type: ['percentage', Validators.required],
      value: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      expiry: ['', Validators.required],
      conditions: [''],
      driverId: [this.driversId] // Initialize driversId
    });

    this.fetchDiscounts();
  }

  fetchDiscounts(): void {
    this.discountService.getDiscounts(this.driversId).subscribe(
      (data) => this.discounts = data,
      (error) => console.error('Error fetching discounts:', error)
    );
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addDiscount(): void {
    if (this.newDiscountForm.valid) {
      const newDiscount = this.newDiscountForm.value;
      newDiscount.value = newDiscount.type === 'percentage' ? `${newDiscount.value}%` : `$${newDiscount.value}`;

      this.discountService.addDiscount(newDiscount).subscribe(
        (response) => {
          this.discounts.push(response);
          this.newDiscountForm.reset({ type: 'percentage'});
          this.showForm = false;
        },
        (error) => console.error('Error adding discount:', error)
      );
    }
  }
}
