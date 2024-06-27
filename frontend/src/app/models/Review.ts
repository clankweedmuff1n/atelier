import {RateTypeEnum} from "./enums/RateType.enum";

export interface Review {
  id: number;
  author: string;
  description: string;
  avatar: string;
  date: Date;
  rate: RateTypeEnum;
}
