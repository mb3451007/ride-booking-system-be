import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PackageService {
  private apiUrl = 'http://localhost:5000/api/packages'; 

  constructor(private http: HttpClient) {}

  addPackage(packages: any): Observable<any> {
    console.log('addPackage() function ran...')
    return this.http.post<any>(this.apiUrl, packages);
  }

  getPackages(driverId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?driverId=${driverId}`);
  }

  deletePackage(packageId: string): Observable<any> {
    console.log('Deleting package with ID:', packageId);
    return this.http.delete<any>(`${this.apiUrl}/delete/${packageId}`);
  }

  disablePackage(packageId: string): Observable<any> {
    console.log('Disabling package with ID:', packageId);
    return this.http.patch<any>(`${this.apiUrl}/disable/${packageId}`, {});
  }

}
