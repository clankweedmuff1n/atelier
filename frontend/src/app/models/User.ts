import {RoleEnum} from "./enums/Role.enum";
import {Product} from "./Product";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  confirmed: boolean;
  password: string;
  role: RoleEnum;
  cart: Product[];
  wishlist: Product[];
}
