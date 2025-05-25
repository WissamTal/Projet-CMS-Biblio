import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/users'; // ← backend Django

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ access: string; refresh: string }>(
      `${this.apiUrl}/token/`,
      credentials
    ).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        this.toastr.success('Connexion réussie 🚀');

        // Extraire le username du token
        const payload = JSON.parse(atob(res.access.split('.')[1]));
        localStorage.setItem('username', payload.username);
      })
    );
  }
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  register(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register/`, data);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.toastr.info('Déconnecté 📴');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && token !== 'undefined';
  }

  getEmail(): string | null {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email || null;
  }

  updateProfile(data: { email: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/`, data);
  }

  getUserProfile(): Observable<{ username: string; email: string }> {
    return this.http.get<{ username: string; email: string }>(`${this.apiUrl}/me/`);
  }

  refreshToken() {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) return throwError(() => new Error('No refresh token'));

    return this.http.post<{ access: string }>(
      'http://localhost:8000/api/users/token/refresh/',
      { refresh }
    ).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.access);
      })
    );
  }


}
