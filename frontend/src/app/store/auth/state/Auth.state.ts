import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {catchError, tap, throwError} from "rxjs";
import {AuthService} from "../service/Auth.service";
import {AuthenticationResponse} from "../../../models/responses/AuthenticationResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../models/User";
import {AddAllProductsToCart, ResetCart} from "../../cart/state/Cart.state";

export interface AuthStateModel {
  token: string | null;
  email: string | null;
  user: User | null;
}

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { email: string; password: string }) {}
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public payload: { first_name: string, last_name: string, email: string; password: string }) {}
}

export class ConfirmAccount {
  static readonly type = '[Auth] Confirm Account';
  constructor(public payload: { code: string }) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    email: null,
    user: null,
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static user(state: AuthStateModel): User | null {
    return state.user;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(private authService: AuthService, private store: Store) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((result: AuthenticationResponse) => {
        ctx.patchState({
          token: result.access_token,
          email: action.payload.email,
          user: result.user
        });
        const cartProducts = ctx.getState().user?.cart || [];
        if (cartProducts.length > 0) {
          this.store.dispatch(new AddAllProductsToCart(cartProducts, result.access_token));
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error instanceof ProgressEvent ? new Error("Server Error") : error.error);
      })
    );
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    return this.authService.register(action.payload).pipe(
      tap((result: AuthenticationResponse) => {
        ctx.patchState({
          token: result.access_token,
          email: action.payload.email,
          user: result.user,
        });
        const cartProducts = ctx.getState().user?.cart || [];
        if (cartProducts.length > 0) {
          this.store.dispatch(new AddAllProductsToCart(cartProducts, result.access_token));
        }
      })
    );
  }

  @Action(ConfirmAccount)
  confirmAccount(ctx: StateContext<AuthStateModel>, action: ConfirmAccount) {
    return this.authService.confirmAccount(action.payload.code).pipe(
      tap((result: User) => {
        ctx.patchState({
          user: result,
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      token: null,
      email: null,
      user: null,
    });
    this.store.dispatch(new ResetCart());
    /*return this.authService.logout(state.token).pipe(
      tap(() => {
        ctx.setState({
          token: null,
          email: null,
          user: null,
        });
      })
    );*/
  }
}
