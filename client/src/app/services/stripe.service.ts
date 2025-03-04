import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private apiUrl = 'http://localhost:5000/api/create-payment-intent'; // Adjust URL if needed

  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number, currency: string): Observable<{ client_secret: string }> {
    return this.http.post<{ client_secret: string }>(this.apiUrl, { amount, currency });
  }
}