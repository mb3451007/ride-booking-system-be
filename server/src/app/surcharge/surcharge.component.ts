import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SurchargeService } from '../services/surcharge.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-surcharge',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './surcharge.component.html',
  styleUrls: ['./surcharge.component.css']
})
export class SurchargeComponent implements OnInit {
  
  surchargeForm!: FormGroup;
  showSurchargeForm = false;
  surcharges: any[] = [];
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  drivers_id: string | null = null;
  editingSurcharge: any = null;

  constructor(private fb: FormBuilder, private surchargeService: SurchargeService, private dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.drivers_id = localStorage.getItem('drivers_id');
    console.log("Driver ID:", this.drivers_id);

    this.surchargeForm = this.fb.group({
      name: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      days: [[]], 
      increaseMultiplier: [0, [Validators.required, Validators.min(1)]],
      vehicles: ['', Validators.required],
      driverId: [this.drivers_id]
    });

    this.loadSurcharges();

    
  }

  toggleSurchargeForm(): void {
    this.showSurchargeForm = !this.showSurchargeForm;
    if (!this.showSurchargeForm) {
      this.surchargeForm.reset();
      this.editingSurcharge = null;
    }
  }

  toggleDaySelection(day: string, event: any): void {
    let selectedDays = this.surchargeForm.value.days;
    if (event.target.checked) {
      selectedDays.push(day);
    } else {
      selectedDays = selectedDays.filter((d: string) => d !== day);
    }
    this.surchargeForm.patchValue({ days: selectedDays });
  }

  addSurcharge(): void {
    if (this.surchargeForm.valid) {
      if (this.editingSurcharge) {
        this.surchargeService.editSurcharge(this.editingSurcharge._id, this.surchargeForm.value).subscribe(response => {
          const index = this.surcharges.findIndex(s => s._id === this.editingSurcharge._id);
          if (index !== -1) {
            this.surcharges[index] = response;
          }
          this.surchargeForm.reset();
          this.showSurchargeForm = false;
          this.editingSurcharge = null;
        });
      } else {
        this.surchargeService.addSurcharge(this.surchargeForm.value).subscribe(response => {
          this.surcharges.push(response);
          this.surchargeForm.reset();
          this.showSurchargeForm = false;
        });
      }
    }
  }

  loadSurcharges(): void {
    this.surchargeService.getSurcharges(this.drivers_id).subscribe(data => {
      this.surcharges = data;
    });
  }

  editSurcharge(surcharge: any): void {
    this.editingSurcharge = surcharge;
    this.surchargeForm.patchValue(surcharge);
    this.showSurchargeForm = true;
  }

  deleteSurcharge(id: string): void {
    this.openConfirmationDialog('Delete Surcharge', 'Are you sure you want to delete this surcharge?')
      .then((confirmed) => {
        if (confirmed) {
          this.surchargeService.deleteSurcharge(id).subscribe(() => {
            Swal.fire('Deleted!', 'The surcharge has been deleted.', 'success');
            this.loadSurcharges();
          });
        }
      });
  }

  disableSurcharge(surchargeId: string) {
    console.log('Disabled')
        this.openConfirmationDialog('Disable Surcharge', 'Are you sure you want to disable this surcharge?')
          .then((confirmed) => {
            if (confirmed) {
              this.surchargeService.disableSurcharge(surchargeId).subscribe(() => {
                Swal.fire('Disabled!', 'The surcharge has been disabled.', 'warning');
                this.loadSurcharges();
              });
            }
          });
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
