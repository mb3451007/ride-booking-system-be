import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
  imports: [CommonModule, MatDialogModule],
})
export class BookingComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingsService: BookingsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getBookings();
  }

  getBookings() {
    const driverId = localStorage.getItem('drivers_id');
    if (!driverId) {
      console.error('Driver ID not found in local storage');
      return;
    }

    this.bookingsService.getBookings(driverId).subscribe(
      (data) => {
        this.bookings = data;
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  confirmBooking(bookingId: string) {
    this.openConfirmationDialog('Confirm Booking', 'Are you sure you want to confirm this booking?')
      .then((confirmed) => {
        if (confirmed) {
          this.bookingsService.confirmBooking(bookingId).subscribe(() => {
            Swal.fire('Confirmed!', 'The booking has been confirmed.', 'success');
            this.getBookings();
          });
        }
      });
  }

  deleteBooking(bookingId: string) {
    this.openConfirmationDialog('Delete Booking', 'Are you sure you want to delete this booking?')
      .then((confirmed) => {
        if (confirmed) {
          this.bookingsService.deleteBooking(bookingId).subscribe(() => {
            Swal.fire('Deleted!', 'The booking has been deleted.', 'success');
            this.getBookings();
          });
        }
      });
  }

  cancelBooking(bookingId: string) {
    this.openConfirmationDialog('Cancel Booking', 'Are you sure you want to cancel this booking?')
      .then((confirmed) => {
        if (confirmed) {
          this.bookingsService.cancelBooking(bookingId).subscribe(() => {
            Swal.fire('Canceled!', 'The booking has been canceled.', 'info');
            this.getBookings();
          });
        }
      });
  }

  shareBooking(booking: any) {
    const bookingDetails = `Booking Details:
    Customer: ${booking.fullName}
    Pickup: ${booking.startingAddress}
    Dropoff: ${booking.arrivalAddress}
    Date: ${booking.date}
    Time: ${booking.time}
    Vehicle: ${booking.vehicleType}`;

    if (navigator.share) {
      navigator.share({
        title: 'Booking Details',
        text: bookingDetails
      }).then(() => {
        console.log('Booking shared successfully!');
      }).catch((error) => {
        console.error('Error sharing booking:', error);
      });
    } else {
      alert('Sharing not supported on this device.');
    }
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
