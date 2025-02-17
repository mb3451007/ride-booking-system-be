import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  packages = [
    { id: 1, name: 'Basic Package', vehicle: 'Car', fixedPrice: 100, priceWithSurcharged: 120, way: 'One-way', status: 'Active' },
    { id: 2, name: 'Premium Package', vehicle: 'SUV', fixedPrice: 200, priceWithSurcharged: 250, way: 'Round-trip', status: 'Disabled' }
  ];

  newPackageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newPackageForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      vehicle: ['', Validators.required],
      fixedPrice: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      priceWithSurcharged: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      way: ['', Validators.required],
      status: ['Active', Validators.required]
    });
  }

  togglePackageForm() {
    this.showPackageForm = !this.showPackageForm;
    if (!this.showPackageForm) {
      this.isEditing = false;
      this.newPackageForm.reset({ status: 'Active' });
    }
  }

  onSubmit() {
    if (this.newPackageForm.valid) {
      const packageData = this.newPackageForm.value;
      if (this.isEditing) {
        const index = this.packages.findIndex(pkg => pkg.id === packageData.id);
        this.packages[index] = packageData;
      } else {
        packageData.id = this.packages.length + 1;
        this.packages.push(packageData);
      }
      this.togglePackageForm();
    }
  }

  editPackage(pkg: any) {
    this.isEditing = true;
    this.newPackageForm.setValue(pkg);
    this.showPackageForm = true;
  }

  deletePackage(id: number) {
    this.packages = this.packages.filter(pkg => pkg.id !== id);
  }
}