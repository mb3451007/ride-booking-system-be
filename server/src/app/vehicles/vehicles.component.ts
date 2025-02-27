import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})

export class VehiclesComponent implements OnInit {

  newVehicleForm!: FormGroup;
  showForm: boolean = false;
  vehicles: any[] = [];
  driverId: string | null = null;

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.driverId = localStorage.getItem('drivers_id');
    this.newVehicleForm = this.fb.group({
      passengerSpace: ['', [Validators.required, Validators.min(1)]],
      baggageSpace: ['', Validators.required],
      numberOwned: ['', [Validators.required, Validators.min(1)]],
      priceFrom: ['', Validators.required],
      pricePerKm: ['', [Validators.required, Validators.min(0)]],
      pricePerMin: ['', [Validators.required, Validators.min(0)]],
      pricePerPassenger: ['', [Validators.required, Validators.min(0)]],
      minimumFare: ['', [Validators.required, Validators.min(0)]],
      driverId: [this.driverId],
      isActive: [true, Validators.required]
    });

    if (this.driverId) {
      this.newVehicleForm.patchValue({ driverId: this.driverId });
    }

    this.loadVehicles();
  }

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

  disableVehicle(vehicleId: string) {
    this.openConfirmationDialog('Disable Vehicle', 'Are you sure you want to disable this vehicle?')
      .then((confirmed) => {
        if (confirmed) {
          this.vehicleService.disableVehicle(vehicleId).subscribe(() => {
            Swal.fire('Disabled!', 'The vehicle has been disabled.', 'warning');
            this.loadVehicles();
          });
        }
      });
  }

  editVehicle(vehicle: any) {
    this.openConfirmationDialog('Edit Vehicle', 'Are you sure you want to edit this vehicle?')
      .then((confirmed) => {
        if (confirmed) {
          // Logic to edit vehicle goes here
          console.log('Editing vehicle:', vehicle);
        }
      });
  }

  deleteVehicle(vehicleId: string) {
    this.openConfirmationDialog('Delete Vehicle', 'Are you sure you want to delete this vehicle?')
      .then((confirmed) => {
        if (confirmed) {
          this.vehicleService.deleteVehicle(vehicleId).subscribe(() => {
            Swal.fire('Deleted!', 'The vehicle has been deleted.', 'success');
            this.loadVehicles();
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
