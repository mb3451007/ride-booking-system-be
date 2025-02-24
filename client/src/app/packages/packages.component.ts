import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PackageService } from '../services/package.service';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent {
  
  showPackageForm: boolean = false;
  isEditing: boolean = false;
  newPackageForm: FormGroup;
  packages: any[] = [];
  drivers_id: string | null = null; // Store drivers_id

  constructor(private fb: FormBuilder, private packageService: PackageService) {

    this.drivers_id = localStorage.getItem('drivers_id'); // Retrieve drivers_id
    console.log("Driver ID:", this.drivers_id); // Debugging

    this.newPackageForm = this.fb.group({
      name: ['', Validators.required],
      vehicle: ['', Validators.required],
      fixedPrice: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      priceWithSurcharged: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      way: ['', Validators.required],
      status: ['Active', Validators.required],
      driverId: [this.drivers_id]
    });

    // Ensure drivers_id is updated
    if (this.drivers_id) {
      this.newPackageForm.patchValue({ drivers_id: this.drivers_id });
    }

    this.loadPackages();
  }

  togglePackageForm() {
    this.showPackageForm = !this.showPackageForm;
    if (!this.showPackageForm) {
      this.isEditing = false;
      this.newPackageForm.reset({ status: 'Active', drivers_id: this.drivers_id });
    }
  }

  addPackage(): void {
    if (this.newPackageForm.valid) {
      this.packageService.addPackage(this.newPackageForm.value).subscribe(() => {
        this.newPackageForm.reset({ status: 'Active', drivers_id: this.drivers_id });
        this.loadPackages();
      });
    }
  }

  loadPackages(): void {
    this.packageService.getPackages(this.drivers_id).subscribe(data => {
      this.packages = data;
    });
  }
}
