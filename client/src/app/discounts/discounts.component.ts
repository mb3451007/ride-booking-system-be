import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DiscountsService } from '../services/discounts.service';
import Swal from 'sweetalert2';

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
  editingDiscount: any = null;

  constructor(private fb: FormBuilder, private discountService: DiscountsService) {}

  ngOnInit(): void {
    this.driversId = localStorage.getItem('drivers_id');
    console.log("Driver ID:", this.driversId);

    this.newDiscountForm = this.fb.group({
      code: ['', Validators.required],
      type: ['percentage', Validators.required],
      value: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      expiry: ['', Validators.required],
      conditions: [''],
      driverId: [this.driversId]
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
    if (!this.showForm) {
      this.newDiscountForm.reset({ type: 'percentage' });
      this.editingDiscount = null;
    }
  }

  addDiscount(): void {
    if (this.newDiscountForm.valid) {
      const discountData = this.newDiscountForm.value;
      if (this.editingDiscount) {
        this.discountService.editDiscount(this.editingDiscount._id, discountData).subscribe(response => {
          const index = this.discounts.findIndex(d => d._id === this.editingDiscount._id);
          if (index !== -1) {
            this.discounts[index] = response;
          }
          this.resetForm();
        });
      } else {
        this.discountService.addDiscount(discountData).subscribe(response => {
          this.discounts.push(response);
          this.resetForm();
        });
      }
    }
  }

  editDiscount(discount: any): void {
    this.editingDiscount = discount;
    this.newDiscountForm.patchValue(discount);
    this.showForm = true;
  }

  deleteDiscount(id: string): void {
    this.openConfirmationDialog('Delete Discount', 'Are you sure you want to delete this discount?')
      .then((confirmed) => {
        if (confirmed) {
          this.discountService.deleteDiscount(id).subscribe(() => {
            Swal.fire('Deleted!', 'The discount has been deleted.', 'success');
            this.fetchDiscounts();
          });
        }
      });
  }

  disableDiscount(id: string): void {
    this.openConfirmationDialog('Disable Discount', 'Are you sure you want to disable this discount?')
      .then((confirmed) => {
        if (confirmed) {
          this.discountService.disableDiscount(id).subscribe(() => {
            Swal.fire('Disabled!', 'The discount has been disabled.', 'warning');
            this.fetchDiscounts();
          });
        }
      });
  }

  resetForm(): void {
    this.newDiscountForm.reset({ type: 'percentage' });
    this.showForm = false;
    this.editingDiscount = null;
  }

  openConfirmationDialog(title: string, message: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => result.isConfirmed);
  }
}
