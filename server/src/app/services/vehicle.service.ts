import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  private apiUrl = 'http://localhost:5000/api/vehicles';

  constructor(private http: HttpClient) {}

  addVehicle(vehicle: any): Observable<any> {
    console.log('Adding vehicle...', vehicle);
    return this.http.post<any>(this.apiUrl, vehicle);
  }

  getVehicles(driverId: any): Observable<any[]> {
    console.log('Fetching vehicles for driver ID:', driverId);
    return this.http.get<any[]>(`${this.apiUrl}?driverId=${driverId}`);
  }

  updateVehicle(vehicleId: string, vehicle: any): Observable<any> {
    console.log('Updating vehicle with ID:', vehicleId, vehicle);
    return this.http.put<any>(`${this.apiUrl}/${vehicleId}`, vehicle);
  }

  deleteVehicle(vehicleId: string): Observable<any> {
    console.log('Deleting vehicle with ID:', vehicleId);
    return this.http.delete<any>(`${this.apiUrl}/delete/${vehicleId}`);
  }

  disableVehicle(vehicleId: string): Observable<any> {
    console.log('Disabling vehicle with ID:', vehicleId);
    return this.http.patch<any>(`${this.apiUrl}/disable/${vehicleId}`, {});
  }
}
