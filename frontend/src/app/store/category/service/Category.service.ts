import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Category} from "../../../models/Category";
import {CategoryRequest} from "../../../models/requests/categoryRequest";

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  readonly apiUrl = `${environment.apiUrl}/category`;

  constructor(private http: HttpClient) {
  }

  createCategory(categoryRequests: CategoryRequest): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/create`, categoryRequests);
  }

  createCategories(categoryRequests: CategoryRequest[]): Observable<Category[]> {
    return this.http.post<Category[]>(`${this.apiUrl}/create/all`, categoryRequests);
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/all`);
  }
}
