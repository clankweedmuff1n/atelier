import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private apiUrl = `${environment.securedApiUrl}/wishlist`;

  constructor(private http: HttpClient) {}

  addProductToWishList(productId: number, token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/add/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addAllProductToWishList(productIds: number[], token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/all`, { productIds }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  removeProductFromWishList(productId: number, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
