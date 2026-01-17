import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserKey = 'currentUser';
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(userData: { name: string; email: string }): Observable<User> {
    return this.http
      .post<{ user: User; token: string }>(`${this.apiUrl}/login`, userData)
      .pipe(
        map((response) => {
          // Store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            this.currentUserKey,
            JSON.stringify(response.user),
          );
          localStorage.setItem(this.tokenKey, response.token);
          return response.user;
        }),
      );
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem(this.currentUserKey);
    localStorage.removeItem(this.tokenKey);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
