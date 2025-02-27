import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Added ReactiveFormsModule

@Component({
  selector: 'app-contact-support',
  standalone: true, // This marks the component as standalone
  templateUrl: './contact-support.component.html',
  styleUrls: ['./contact-support.component.css'],
  imports: [ReactiveFormsModule] // Import ReactiveFormsModule here
})
export class ContactSupportComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    console.log('Form submitted successfully:', this.contactForm.value);
    setTimeout(() => {
      alert('Your support request has been submitted successfully.');
    }, 1000);
  }
}
