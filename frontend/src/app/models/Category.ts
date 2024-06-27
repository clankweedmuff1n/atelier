import {Review} from "./Review";
import {GalleryItem} from "./GalleryItem";
import {Product} from "./Product";

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
