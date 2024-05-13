import {RoleEnum} from "./enums/Role.enum";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  confirmed: boolean;
  password: string;
  role: RoleEnum;
}
