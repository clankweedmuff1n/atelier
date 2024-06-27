import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.securedApiUrl}/cart`;

  constructor(private http: HttpClient) {}

  addProductToCart(productId: number, token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/add/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addAllProductToCart(productIds: number[], token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/all`, { productIds }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  removeProductFromCart(productId: number, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
