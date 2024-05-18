import {RateType} from "../RateType";

export interface ReviewRequest {
    author: string;
    description: string;
    avatar: string;
    rate: RateType;
    category_id?: number;
    product_id?: number;
}
