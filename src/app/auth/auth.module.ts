import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@NgModule({
  declarations: [],
  imports: [
    CommonModule, // Include CommonModule for *ngIf
    ReactiveFormsModule // Include ReactiveFormsModule for formGroup
  ]
})
export class AuthModule { }
