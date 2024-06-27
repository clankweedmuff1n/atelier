import {User} from "../User";

export interface AuthenticationResponse {
  access_token: string;
  refresh_token: string;
  user: User;

}
