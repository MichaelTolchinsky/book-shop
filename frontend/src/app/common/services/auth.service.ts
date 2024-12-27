import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthData } from '../models/auth-data.model';

const BACKEND_URL = `${environment.apiUrl}/user/`;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  token = signal<string | null>(null);
  userId = signal<string | null>(null);
  isAuthenticated = signal<boolean>(false);

  getToken(): string | null {
    return this.token();
  }

  getIsAuth(): boolean {
    return this.isAuthenticated();
  }

  getUserId(): string | null {
    return this.userId();
  }

  createUser(email: string, password: string): void {
    const authData: AuthData = { email, password };
    this.http.post(`${BACKEND_URL}/signup`, authData).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.isAuthenticated.set(false),
    });
  }

  login(email: string, password: string): void {
    const authData: AuthData = { email, password };
    this.http.post<{ token: string; expiresIn: number; userId: string }>(`${BACKEND_URL}login`, authData).subscribe({
      next: res => this.handleLoginSuccess(res),
      error: () => this.isAuthenticated.set(false),
    });
  }

  autoLoginUser(): void {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.setSession(authInfo.token, authInfo.userId, expiresIn / 1000);
    }
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/']);
  }

  private handleLoginSuccess(res: { token: string; expiresIn: number; userId: string }): void {
    const expirationDate = new Date(new Date().getTime() + res.expiresIn * 1000);
    this.setSession(res.token, res.userId, res.expiresIn);
    this.saveAuthData(res.token, expirationDate, res.userId);
    this.router.navigate(['/']);
  }

  private setSession(token: string, userId: string, expiresIn: number): void {
    this.token.set(token);
    this.userId.set(userId);
    this.isAuthenticated.set(true);

    setTimeout(() => this.logout(), expiresIn * 1000);
  }

  private clearSession(): void {
    this.token.set(null);
    this.userId.set(null);
    this.isAuthenticated.set(false);
    this.clearAuthData();
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
  }

  private getAuthData(): { token: string; expirationDate: Date; userId: string } | null {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return null;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
    };
  }
}
