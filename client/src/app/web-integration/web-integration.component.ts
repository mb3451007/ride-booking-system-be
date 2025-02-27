import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-web-integration',
  standalone: true,
  templateUrl: './web-integration.component.html',
  styleUrls: ['./web-integration.component.css'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class WebIntegrationComponent implements AfterViewInit, OnInit {
  driverId: string | null = null;
  iframeUrl: string = ''; 

  currentDate = new Date();
  currentDateString = this.currentDate.toISOString().split('T')[0];
  currentTimeString = this.currentDate.toTimeString().split(' ')[0];

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  newDiscountForm!: FormGroup;
  private map!: Map;
  private vectorSource = new VectorSource();
  private vectorLayer!: VectorLayer;
  selectedLocations: { name: string; lat: number; lon: number }[] = [];
  currentField: 'startingAddress' | 'arrivalAddress' | null = null;
  mapInitialized = false;
  selectedCoordinates: { lat: number; lon: number } | null = null;
  selectedLocationName: string | null = null;

  constructor(private fb: FormBuilder) {
    this.newDiscountForm = this.fb.group({
      startingAddress: [''],
      arrivalAddress: [''],
      date: [this.currentDateString],  // ✅ Fix initialization
      time: [this.currentTimeString],  // ✅ Fix initialization
      vehicleType: ['sedan'], 
      tripType: ['one-way'],
    });
  }

  ngOnInit(): void {
    const currentDomain = window.location.origin;
    const driversId = localStorage.getItem('drivers_id');

    if (driversId) {
      this.iframeUrl = `${currentDomain}/booking-form?id=${driversId}`;
    } else {
      console.error('drivers_id not found in localStorage');
    }
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
    }, 100);
  }

  closeMap(): void {
    document.getElementById('mapModal')!.style.display = 'none';
  }

  private initializeMap(): void {
    if (!this.map) {
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
          center: fromLonLat([2.3522, 48.8566]),
          zoom: 6,
        }),
      });

      this.map.on('click', (event) => {
        const coordinates = event.coordinate;
        const [lon, lat] = toLonLat(coordinates);
        console.log('Clicked Coordinates:', { lon, lat });
        this.selectedCoordinates = { lat, lon };
        this.addMarker(lon, lat);
      });
    }
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
      const { lat, lon } = this.selectedCoordinates;

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
}
