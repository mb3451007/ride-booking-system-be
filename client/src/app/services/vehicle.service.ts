import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  private apiUrl = 'http://localhost:5000/api/vehicles';

  constructor(private http: HttpClient) {

  }

  addVehicle(vehicle: any): Observable<any> {
    console.log('addVehicle() function ran...')
    return this.http.post<any>(this.apiUrl, vehicle);
  }

  getVehicles(driverId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?driverId=${driverId}`);
  }
}
