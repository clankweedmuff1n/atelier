import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {GalleryItem} from "../../../models/galleryItem";
import {GalleryItemRequest} from "../../../models/requests/galleryItemRequest";

@Injectable({
  providedIn: 'root',
})
export class GalleryItemService {
  readonly apiUrl = `${environment.apiUrl}/gallery`;

  constructor(private http: HttpClient) {
  }

  createGalleryItem(galleryItemRequest: GalleryItemRequest): Observable<GalleryItem> {
    return this.http.post<GalleryItem>(`${this.apiUrl}/create`, galleryItemRequest);
  }

  createGalleryItems(galleryItemRequest: GalleryItemRequest[]): Observable<GalleryItem[]> {
    return this.http.post<GalleryItem[]>(`${this.apiUrl}/create/all`, galleryItemRequest);
  }

  getAllGalleryItem(): Observable<GalleryItem[]> {
    return this.http.get<GalleryItem[]>(`${this.apiUrl}/all`);
  }
}
