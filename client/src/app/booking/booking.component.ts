import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings.service';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
  imports: [CommonModule],
})
export class BookingComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingsService: BookingsService) {}

  ngOnInit() {
    this.getBookings();
  }

  getBookings() {
    const driverId = localStorage.getItem('drivers_id'); // Retrieve driver ID from local storage
    if (!driverId) {
      console.error('Driver ID not found in local storage');
      return;
    }

    this.bookingsService.getBookings(driverId).subscribe(
      (data) => {
        this.bookings = data;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }
}
