export interface ProductRequest {
    name: string;
    description: string;
    product_type: string;
    price: number;
    link: string;
    details: string[];
    composition: string[]
    category_id: number;
    gallery?: number[];
    preview?: number;
    reviews?: number[];
}
