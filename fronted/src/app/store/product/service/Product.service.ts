import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../../models/product";
import {environment} from "../../../../environments/environment";
import {ProductRequest} from "../../../models/requests/productRequest";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly apiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) {
  }

  createProducts(productRequests: ProductRequest[]): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.apiUrl}/create/all`, productRequests);
  }

  createProduct(productRequest: ProductRequest): Observable<Product> {
    console.log(productRequest);
    return this.http.post<Product>(`${this.apiUrl}/create`, productRequest);
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/all`);
  }
}
