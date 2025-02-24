import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SurchargeService } from '../services/surcharge.service';

@Component({
  selector: 'app-surcharge',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './surcharge.component.html',
  styleUrls: ['./surcharge.component.css']
})
export class SurchargeComponent implements OnInit {
  
  surchargeForm!: FormGroup;
  showForm = false;
  surcharges: any[] = [];
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  drivers_id: string | null = null; // Store drivers_id

  constructor(private fb: FormBuilder, private surchargeService: SurchargeService) {}

  ngOnInit(): void {
    this.drivers_id = localStorage.getItem('drivers_id'); // Retrieve drivers_id from localStorage
    console.log("Driver ID:", this.drivers_id); // Debugging

    this.surchargeForm = this.fb.group({
      name: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      days: [[]], 
      increaseMultiplier: [0, [Validators.required, Validators.min(1)]],
      vehicles: ['', Validators.required],
      driverId: [this.drivers_id] // Include drivers_id in the form
    });

    // Ensure drivers_id is updated
    if (this.drivers_id) {
      this.surchargeForm.patchValue({ drivers_id: this.drivers_id });
    }

    this.loadSurcharges(); // Fetch existing surcharges
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
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
      this.surchargeService.addSurcharge(this.surchargeForm.value).subscribe(response => {
        this.surcharges.push(response);
        this.surchargeForm.reset({ days: [], drivers_id: this.drivers_id });
        this.showForm = false;
      });
    }
  }

  loadSurcharges(): void {
    this.surchargeService.getSurcharges(this.drivers_id).subscribe(data => {
      this.surcharges = data;
    });
  }

  deleteSurcharge(id: string): void {
    this.surchargeService.deleteSurcharge(id).subscribe(() => {
      this.surcharges = this.surcharges.filter(s => s._id !== id);
    });
  }
}
