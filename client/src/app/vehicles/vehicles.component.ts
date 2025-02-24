import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})

export class VehiclesComponent implements OnInit {

  newVehicleForm!: FormGroup;
  showForm: boolean = false;  // Toggle form visibility
  vehicles: any[] = [];  // Array to store vehicles data
  driverId: string | null = null; // Variable to store the driver ID

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.driverId = localStorage.getItem('drivers_id'); // Retrieve the driver ID
    console.log("Driver ID:", this.driverId); // Debugging
    
    // Initialize the form with driverId set
    this.newVehicleForm = this.fb.group({
      passengerSpace: ['', [Validators.required, Validators.min(1)]],
      baggageSpace: ['', Validators.required],
      numberOwned: ['', [Validators.required, Validators.min(1)]],
      priceFrom: ['', Validators.required],
      pricePerKm: ['', [Validators.required, Validators.min(0)]],
      pricePerMin: ['', [Validators.required, Validators.min(0)]],
      pricePerPassenger: ['', [Validators.required, Validators.min(0)]],
      minimumFare: ['', [Validators.required, Validators.min(0)]],
      driverId: [this.driverId], // Ensure driverId is required
      isActive: [true, Validators.required]
    });
  
    // Ensure driverId is updated after the form is created
    if (this.driverId) {
      this.newVehicleForm.patchValue({ driverId: this.driverId });
    }
  
    this.loadVehicles();
  }
  

  // Toggle form visibility
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addVehicle(): void {
    if (this.newVehicleForm.valid) {
      const formData = this.newVehicleForm.value;
      this.vehicleService.addVehicle(formData).subscribe(() => {
        this.loadVehicles();
        this.newVehicleForm.reset();
        this.showForm = false;
      });
    }
  }
  
  loadVehicles(): void {
    this.vehicleService.getVehicles(this.driverId).subscribe(data => {
      this.vehicles = data;
    });
  }

}
