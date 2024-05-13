export interface CategoryRequest {
    name: string;
    description: string;
    link: string;
    button_text: string;
    preview: number;
    gallery?: number[];
    products?: number[];
    reviews?: number[];
}
