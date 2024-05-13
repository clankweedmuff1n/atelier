import {GalleryItem} from "./galleryItem";
import {Review} from "./review";

export interface Product {
  id: number;
  name: string;
  description: string;
  productType: string;
  price: number;
  link: string;
  details: string[];
  composition: string[];
  created_at: Date;
  updated_at: Date;
  reviews: Review[];
  preview: GalleryItem;
  gallery: GalleryItem[];
}
