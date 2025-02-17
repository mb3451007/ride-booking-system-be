import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent {
  newVehicleForm!: FormGroup;
  
  showForm: boolean = false;  // Toggle form visibility
  vehicles: any[] = [];  // Array to store vehicles data

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form group
    this.newVehicleForm = this.fb.group({
      vehicleId: ['', Validators.required],
      passengerSpace: [0, [Validators.required, Validators.min(1)]],
      baggageSpace: ['', Validators.required],
      numberOwned: [0, [Validators.required, Validators.min(1)]],
      priceFrom: ['', Validators.required],
      pricePerKm: [0, [Validators.required, Validators.min(0)]],
      pricePerMin: [0, [Validators.required, Validators.min(0)]],
      pricePerPassenger: [0, [Validators.required, Validators.min(0)]],
      minimumFare: [0, [Validators.required, Validators.min(0)]],
      isActive: [true, Validators.required]
    });
  }

  // Toggle form visibility
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  // Method to add vehicle to the list
  addVehicle(): void {
    if (this.newVehicleForm.valid) {
      // Create a new vehicle object from form values
      const newVehicle = this.newVehicleForm.value;

      // Push the new vehicle into the vehicles array
      this.vehicles.push(newVehicle);

      // Reset the form after adding the vehicle
      this.newVehicleForm.reset();
      this.showForm = false; // Hide the form after adding
    }
  }
}
