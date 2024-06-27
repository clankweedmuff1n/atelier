import {RateTypeEnum} from "../enums/RateType.enum";

export interface ReviewRequest {
    author: string;
    description: string;
    avatar: string;
    rate: RateTypeEnum;
    category_id?: number;
    product_id?: number;
}
