import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root', // Automatically provides the service
})

export class AuthService {
  private apiUrl = environment.apiBaseUrl; // Base URL for the API
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string; rememberMe?: boolean }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, credentials); // Login endpoint
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, userData); // Correct registration endpoint
  }
}