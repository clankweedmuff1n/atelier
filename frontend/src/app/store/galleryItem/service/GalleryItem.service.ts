import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
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

  createGalleryItemFromFile(file: File, galleryItemRequest?: GalleryItemRequest): Observable<GalleryItem> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    //formData.append('galleryItemRequest', JSON.stringify(galleryItemRequest));
    const req = new HttpRequest('POST', `${this.apiUrl}/create/file`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    //return this.http.request<GalleryItem>(req);
    return this.http.post<GalleryItem>(`${this.apiUrl}/create/file`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }

  createGalleryItemsFromFiles(files: File[], galleryItemRequest?: GalleryItemRequest[]): Observable<GalleryItem[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file));
    //formData.append('galleryItemRequests', JSON.stringify(galleryItemRequest));
    return this.http.post<GalleryItem[]>(`${this.apiUrl}/create/file/all`, formData);
  }

  getAllGalleryItem(): Observable<GalleryItem[]> {
    return this.http.get<GalleryItem[]>(`${this.apiUrl}/all`);
  }
}
