import {RateType} from "./RateType";

export interface Review {
  id: number;
  author: string;
  description: string;
  avatar: string;
  date: Date;
  rate: RateType;
}
