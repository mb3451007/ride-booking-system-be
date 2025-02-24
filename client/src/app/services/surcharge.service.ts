import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurchargeService {
  private apiUrl = 'http://localhost:5000/api/surcharges';

  constructor(private http: HttpClient) {}

  // Get all surcharges
  getSurcharges(driverId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?driverId=${driverId}`);
  }

  // Add a new surcharge
  addSurcharge(surcharge: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, surcharge);
  }

  // Delete a surcharge
  deleteSurcharge(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
