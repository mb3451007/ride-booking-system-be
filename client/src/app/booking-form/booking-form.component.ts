import { ActivatedRoute } from '@angular/router';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Icon } from 'ol/style';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../services/bookings.service';

@Component({
  selector: 'app-booking-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})

export class BookingFormComponent implements AfterViewInit, OnInit {
  driverId: string | null = null; // Variable to store the driver ID

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  newDiscountForm!: FormGroup;
  private map!: Map;
  private vectorSource = new VectorSource(); // Ensure vector source is initialized
  private vectorLayer!: VectorLayer;
  selectedLocations: { name: string; lat: number; lon: number }[] = [];
  currentField: 'startingAddress' | 'arrivalAddress' | null = null;
  mapInitialized = false;
  selectedCoordinates: { lat: number; lon: number } | null = null;
  selectedLocationName: string | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private bookingService: BookingsService) {
    this.newDiscountForm = this.fb.group({
      fullName: [''], // Add full name field
      startingAddress: [''],
      arrivalAddress: [''],
      date: [''],
      time: [''],
      vehicleType: ['sedan'], // Default vehicle type
      tripType: ['one-way'],
      driverId: [this.driverId] // Include driver ID
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.driverId = params['id'] || null;
      console.log('Driver ID:', this.driverId);
    });
  }

ngAfterViewInit(): void {}

  openMap(field: 'startingAddress' | 'arrivalAddress'): void {
    this.currentField = field;
    document.getElementById('mapModal')!.style.display = 'flex';

    setTimeout(() => {
      if (!this.mapInitialized) {
        this.initializeMap();
        this.mapInitialized = true;
      }
    }, 100); // Ensures the map fully renders
  }

  closeMap(): void {
    document.getElementById('mapModal')!.style.display = 'none';
  }

  private initializeMap(): void {
    this.vectorLayer = new VectorLayer({ source: this.vectorSource });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.vectorLayer,
      ],
      view: new View({
        center: fromLonLat([2.3522, 48.8566]), // Default center (Paris)
        zoom: 6,
      }),
    });

    // Add click event listener to the map
    this.map.on('click', (event) => {
      const coordinates = event.coordinate;
      const [lon, lat] = toLonLat(coordinates); // Convert coordinates to longitude and latitude
      console.log('Clicked Coordinates:', { lon, lat }); // Debugging
      this.selectedCoordinates = { lat, lon };
      this.addMarker(lon, lat);
    });
  }

  private addMarker(lon: number, lat: number): void {
    if (!this.map || !this.vectorSource) {
      console.error('Map or vector source is not initialized.');
      return;
    }

    this.vectorSource.clear();

    const marker = new Feature({
      geometry: new Point(fromLonLat([lon, lat])),
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          anchor: [0.5, 1],
          scale: 0.8,
        }),
      })
    );

    this.vectorSource.addFeature(marker);
    this.map.render();
  }

  confirmLocation(): void {
    if (this.selectedCoordinates && this.currentField) {
      const { lat, lon } = this.selectedCoordinates; // Destructure safely

      this.getLocationName(lat, lon).then((name) => {
        this.selectedLocationName = name;

        console.log('Selected Location:', { name, lat, lon });

        if (this.currentField) {
          this.selectedLocations.push({ name, lat, lon });

          this.newDiscountForm.patchValue({
            [this.currentField]: name,
          });
        }

        this.closeMap();
      });
    }
  }

  private async getLocationName(lat: number, lon: number): Promise<string> {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return data.display_name || `Lat: ${lat}, Lon: ${lon}`;
  }

  clearMarkers(): void {
    this.vectorSource.clear();
    this.selectedLocations = [];
  }

  logFormData(): void {
    console.log('Form Data:', this.newDiscountForm.value);
  }

  // Method to copy iframe code to clipboard
  
  copyIframeCode(): void {
    const iframeCode = document.getElementById('iframeCode')!.innerText;
    navigator.clipboard.writeText(iframeCode)
      .then(() => {
        alert('Iframe code copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy iframe code:', err);
        alert('Failed to copy iframe code. Please try again.');
      });
  }

    bookingSuccess = false;
    bookingError = false;
  
    submitBooking(): void {
      if (this.newDiscountForm.valid) {
        const formData = { ...this.newDiscountForm.value, driverId: this.driverId };
  
        this.bookingService.bookRide(formData).subscribe(
          (response) => {
            console.log('Booking successful:', response);
            this.bookingSuccess = true;
            this.bookingError = false;
            this.clearForm();
          },
          (error) => {
            console.error('Booking failed:', error);
            this.bookingError = true;
            this.bookingSuccess = false;
          }
        );
      } else {
        alert('Please fill all required fields.');
      }
    }
  
  // Method to clear the form and markers
  clearForm(): void {
    this.newDiscountForm.reset({
      vehicleType: 'sedan', // Reset to default vehicle type
      tripType: 'one-way', // Reset to default trip type
    });
    this.clearMarkers(); // Clear markers from the map
    this.selectedLocations = []; // Clear selected locations
    this.selectedCoordinates = null; // Clear selected coordinates
    this.selectedLocationName = null; // Clear selected location name
  }

}