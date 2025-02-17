import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
  
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
  
    constructor(private fb: FormBuilder) {}
  
    ngOnInit(): void {
      this.surchargeForm = this.fb.group({
        name: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        days: [[]], // Array for selected days
        increaseMultiplier: [0, [Validators.required, Validators.min(1)]],
        vehicles: ['', Validators.required]
      });
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
        this.surcharges.push(this.surchargeForm.value);
        this.surchargeForm.reset({ days: [] });
        this.showForm = false;
      }
    }
  }
  