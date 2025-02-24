import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BookingsService {
  private apiUrl = 'http://localhost:5000/api/bookings'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  bookRide(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getBookings(driverId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?driverId=${driverId}`);
  }
}
