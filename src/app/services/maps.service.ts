import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private geocoder: google.maps.Geocoder | undefined;
  private map: google.maps.Map | undefined;
  private mapsLoaded: boolean = false;

  constructor(private ngZone: NgZone) {
    this.loadGoogleMapsAPI().then(() => {
      this.mapsLoaded = true;
      this.geocoder = new google.maps.Geocoder();
    }).catch(err => console.error("Google Maps API failed to load", err));
  }

  private loadGoogleMapsAPI(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (typeof window.google !== 'undefined' && window.google.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log('Google Maps API loaded successfully');
        resolve();
      };
      script.onerror = () => reject(new Error('Google Maps API failed to load'));
    });
  }

  async loadMap(): Promise<void> {
    if (!this.mapsLoaded) {
      await this.loadGoogleMapsAPI();
      this.mapsLoaded = true;
      this.geocoder = new google.maps.Geocoder();
    }
  }

  setMapElement(
    mapElement: HTMLElement, 
    inputElement: HTMLInputElement, 
    locationCallback: (location: google.maps.GeocoderResult) => void
  ) {
    if (!this.mapsLoaded) {
      console.error("Google Maps API not loaded. Call loadMap() first.");
      return;
    }

    console.log('Initializing map...');
    this.map = new google.maps.Map(mapElement, {
      center: { lat: 37.422, lng: -122.084 },
      zoom: 10
    });
    console.log('Map initialized:', this.map);

    const autocomplete = new google.maps.places.Autocomplete(inputElement);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry?.location) return;

      this.map?.setCenter(place.geometry.location);
      this.map?.setZoom(15);

      if (place.place_id && this.geocoder) {
        this.geocoder.geocode({ placeId: place.place_id }, (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            this.ngZone.run(() => locationCallback(results[0]));
          } else {
            console.error('Geocode was not successful: ' + status);
          }
        });
      }
    });

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (!event.latLng || !this.geocoder) return;
      
      this.geocoder.geocode({ location: event.latLng }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          this.ngZone.run(() => locationCallback(results[0]));
        } else {
          console.error('Geocode was not successful: ' + status);
        }
      });
    });
  }
}