import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private username = new BehaviorSubject<string | null>(this.getUsernameFromToken());

  constructor(@Inject(DOCUMENT) private document: Document) {}

  hasToken(): boolean {
    const localStorage = this.document.defaultView?.localStorage;
    if (!localStorage) {
      return false;
    }
    return !!localStorage.getItem('token');
  }

  private getUsernameFromToken(): string | null {
    const localStorage = this.document.defaultView?.localStorage;
    if (!localStorage) {
      return null;
    }
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.username;
    }
    return null;
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getUsername() {
    return this.username;
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
    this.username.next(this.getUsernameFromToken());
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.username.next(null);
  }
}
