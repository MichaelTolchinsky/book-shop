import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = `${environment.apiUrl}/cart/`;

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient, private router: Router) { }

  addToCart(bookId: string) {
    const userId = localStorage.getItem('userId');
    this.http.post(BACKEND_URL + bookId, { userId: userId }).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  getCart() {
    const userId = localStorage.getItem('userId');
    return this.http.get<{ message: string, cart: any }>(BACKEND_URL + userId)
  }

  removeFromCart(bookId: string) {
    const userId = localStorage.getItem('userId');
    return this.http.delete<{ message: string, cart: any }>(BACKEND_URL + userId, { params: { 'bookId': bookId } });
  }

  clearCart() {
    const userId = localStorage.getItem('userId');
    return this.http.put<{ message: string, cart: any }>(BACKEND_URL + userId, null);
  }
}
