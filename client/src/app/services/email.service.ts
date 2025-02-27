import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:5000/api/send-email'; // Change this to your backend URL

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, message: string): Observable<any> {
    return this.http.post(this.apiUrl, { to, subject, message });
  }
}
