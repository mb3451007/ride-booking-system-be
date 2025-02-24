import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {
  private apiUrl = 'http://localhost:5000/api/discounts';

  constructor(private http: HttpClient) {}

  getDiscounts(driverId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?driverId=${driverId}`);
  }

  addDiscount(discount: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, discount);
  }
}
