import {GalleryItem} from "./galleryItem";
import {Review} from "./review";
import {Product} from "./product";

export interface Category {
  id: number;
  name: string;
  description: string;
  link: string;
  button_text: string;
  preview: GalleryItem;
  gallery: GalleryItem[];
  reviews: Review[];
  products: Product[];
}
