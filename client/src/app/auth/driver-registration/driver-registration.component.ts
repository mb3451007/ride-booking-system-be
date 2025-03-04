import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { StripeService } from '../../services/stripe.service';
import { HttpClientModule } from '@angular/common/http';

declare var Stripe: any;

@Component({
  selector: 'app-driver-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './driver-registration.component.html',
  styleUrls: ['./driver-registration.component.css']
})
export class DriverRegisterComponent implements OnInit, AfterViewInit {
  step = 1;
  step1Form: FormGroup;
  step2Form: FormGroup;
  message: string = '';
  isError: boolean = false;

  private stripe: any;
  private card: any;
  private stripeLoaded = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private stripeService: StripeService
  ) {
    this.step1Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      consent: [false, Validators.requiredTrue]
    });

    this.step2Form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      company: [''],
      address: [''],
      subscription: ['monthly', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{13,19}$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      dataConsent: [false, Validators.requiredTrue],
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    this.loadStripe();
  }

  ngAfterViewInit() {
    this.initializeStripeElements();
  }

  private async loadStripe(): Promise<void> {
    if (!this.stripeLoaded) {
      try {
        await this.loadStripeScript();
        this.stripe = Stripe('pk_test_51N2zfiBHAK3VyaqUHLxCAue1ZffFof5jE4X4lRfxvBqffzikRlcQTxj3Lrb3zbVgkmHSob3i2hidx0aQEP153HTM00rJFnDGJo');
        this.stripeLoaded = true;
        this.initializeStripeElements();
      } catch (error) {
        console.error('Error loading Stripe:', error);
        this.showMessage('Failed to load payment system. Please try again later.', true);
      }
    }
  }

  private loadStripeScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof Stripe !== 'undefined') {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Stripe script'));
      document.head.appendChild(script);
    });
  }

  private initializeStripeElements() {
    if (!this.stripe || !document.getElementById('card-element')) {
      return;
    }

    const elements = this.stripe.elements();
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', {
      style: style,
      hidePostalCode: true
    });
    this.card.mount('#card-element');

    this.card.on('change', (event: any) => {
      if (event.error) {
        this.showMessage(event.error.message, true);
      }
    });
  }

  nextStep() {
    this.step1Form.markAllAsTouched();
    if (this.step === 1 && this.step1Form.valid) {
      this.step = 2;
    }
  }

  prevStep() {
    this.step = 1;
  }

  async submitForm() {
    this.step1Form.markAllAsTouched();
    this.step2Form.markAllAsTouched();

    if (!this.step1Form.valid || !this.step2Form.valid || !this.stripe || !this.card) {
      this.showMessage('Please complete all required fields correctly.', true);
      return;
    }

    try {
      // Create payment method
      const { paymentMethod, error: pmError } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.card,
        billing_details: {
          name: `${this.step2Form.value.firstName} ${this.step2Form.value.lastName}`,
          email: this.step1Form.value.email,
          phone: this.step2Form.value.phone
        }
      });

      if (pmError) {
        this.showMessage(pmError.message, true);
        return;
      }

      // Calculate amount based on subscription
      const amount = this.step2Form.value.subscription === 'monthly' ? 3900 : 32700; // in cents
      const currency = 'usd';

      // Create payment intent
      this.stripeService.createPaymentIntent(amount, currency).subscribe({
        next: async (paymentIntent) => {
          try {
            // Confirm payment
            const { error: confirmError } = await this.stripe.confirmCardPayment(
              paymentIntent.client_secret, // Using client_secret as per backend response
              {
                payment_method: paymentMethod.id
              }
            );

            if (confirmError) {
              this.showMessage(confirmError.message, true);
              return;
            }

            // Submit registration
            const formData = {
              ...this.step1Form.value,
              ...this.step2Form.value,
              paymentMethodId: paymentMethod.id
            };

            this.authService.register(formData).subscribe({
              next: (response) => {
                this.showMessage('Registration successful! Redirecting to login...', false);
                setTimeout(() => {
                  this.router.navigate(['/login']).then(() => {
                    window.location.reload();
                  });
                }, 1000);
              },
              error: (regError) => {
                this.showMessage('Registration failed: ' + (regError.message || 'Unknown error'), true);
              }
            });
          } catch (error) {
            this.showMessage('Payment confirmation failed.', true);
          }
        },
        error: (intentError) => {
          this.showMessage('Failed to create payment intent: ' + (intentError.message || 'Unknown error'), true);
        }
      });
    } catch (error) {
      this.showMessage('Payment processing error occurred.', true);
    }
  }

  validateNumberInput(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key) && event.key !== '-') {
      event.preventDefault();
    }
  }

  showMessage(message: string, isError: boolean) {
    this.message = message;
    this.isError = isError;
    const modalElement = document.getElementById('messageModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}