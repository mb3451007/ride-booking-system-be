import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-vehicle-dialog',
  templateUrl: './edit-vehicle-dialog.component.html',
  styleUrls: ['./edit-vehicle-dialog.component.css'],
  imports: [MatDialogRef]
})
export class EditVehicleDialogComponent {
  vehicleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditVehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.vehicleForm = this.fb.group({
      passengerSpace: [data.passengerSpace, [Validators.required, Validators.min(1)]],
      baggageSpace: [data.baggageSpace, Validators.required],
      numberOwned: [data.numberOwned, [Validators.required, Validators.min(1)]],
      priceFrom: [data.priceFrom, Validators.required],
      pricePerKm: [data.pricePerKm, [Validators.required, Validators.min(0)]],
      pricePerMin: [data.pricePerMin, [Validators.required, Validators.min(0)]],
      pricePerPassenger: [data.pricePerPassenger, [Validators.required, Validators.min(0)]],
      minimumFare: [data.minimumFare, [Validators.required, Validators.min(0)]]
    });
  }

  save(): void {
    if (this.vehicleForm.valid) {
      this.dialogRef.close(this.vehicleForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
