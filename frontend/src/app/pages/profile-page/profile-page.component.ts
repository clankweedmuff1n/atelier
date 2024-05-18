import {Component} from '@angular/core';
import {Store} from "@ngxs/store";
import {User} from "../../models/User";
import {AuthState, Logout} from "../../store/auth/state/Auth.state";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  template: `
    <h2>{{ token }}</h2>
    <button (click)="logout()">LOGOUT</button>
  `,
})
export class ProfilePageComponent {
  token: string | null;

  logout() {
    this.store.dispatch(new Logout())
  }

  constructor(private store: Store) {
    this.token = this.store.selectSnapshot(AuthState.token);
  }
}
