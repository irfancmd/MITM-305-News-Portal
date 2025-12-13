import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserKey = 'currentUser';

  login(user: User): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }
}
