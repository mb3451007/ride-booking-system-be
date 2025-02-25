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

  editSurcharge(surchargeId: string, surcharge: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit/${surchargeId}`, surcharge);
  }

  deleteSurcharge(surchargeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${surchargeId}`);
  }

  disableSurcharge(surchargeId: string): Observable<any> {
    console.log('Disabling surcharge with ID:', surchargeId);
    return this.http.patch<any>(`${this.apiUrl}/disable/${surchargeId}`, {});
}

}