import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Product} from "../../../models/Product";
import {AuthState} from "../../auth/state/Auth.state";
import {catchError, tap, throwError} from "rxjs";
import {CartService} from "../service/Cart.service";

export class ToggleProductInCart {
  static readonly type = '[Cart] Toggle Product';

  constructor(public payload: Product) {
  }
}

export class AddAllProductsToCart {
  static readonly type = '[Cart] Add All Products';

  constructor(public payload: Product[], public token: string | null) {
  }
}

export class ResetCart {
  static readonly type = '[Cart] Reset cart';
}

export interface CartStateModel {
  products: Product[];
  loading: boolean;
  error: Error | undefined;
}

@State<CartStateModel>({
  name: 'Cart',
  defaults: {
    products: [],
    loading: false,
    error: undefined,
  }
})
@Injectable()
export class CartState {
  constructor(private cartService: CartService, private store: Store) {
  }

  @Action(ToggleProductInCart)
  ToggleProductInCart(ctx: StateContext<CartStateModel>, action: ToggleProductInCart) {
    const state = ctx.getState();
    const isProductInCart = state.products.some(product => product.id === action.payload.id);
    const token = this.store.selectSnapshot(AuthState.token);

    if (token) {
      ctx.patchState({loading: true});

      const request = isProductInCart
        ? this.cartService.removeProductFromCart(action.payload.id, token)
        : this.cartService.addProductToCart(action.payload.id, token);

      return request.pipe(
        tap(() => {
          const updatedProducts = isProductInCart
            ? state.products.filter(product => product.id !== action.payload.id)
            : [...state.products, action.payload];

          ctx.patchState({
            products: updatedProducts,
            loading: false,
            error: undefined
          });
        }),
        catchError((error) => {
          ctx.patchState({
            loading: false,
            error
          });
          return throwError(() => error);
        })
      );
    } else {
      const updatedProducts = isProductInCart
        ? state.products.filter(product => product.id !== action.payload.id)
        : [...state.products, action.payload];

      ctx.patchState({
        products: updatedProducts
      });

      return;
    }
  }

  @Action(AddAllProductsToCart)
  AddAllProductsToCart(ctx: StateContext<CartStateModel>, action: AddAllProductsToCart) {
    const state = ctx.getState();

    const newProducts = action.payload.filter(product =>
      !state.products.some(existingProduct => existingProduct.id === product.id)
    );

    if (action.token) {
      ctx.patchState({loading: true});

      if (newProducts.length > 0) {
        return this.cartService.addAllProductToCart(newProducts.map(product => product.id), action.token).pipe(
          tap(() => {
            ctx.patchState({
              products: [...state.products, ...newProducts],
              loading: false,
              error: undefined
            });
          }),
          catchError((error) => {
            ctx.patchState({
              loading: false,
              error
            });
            return throwError(() => error);
          })
        );
      } else {
        ctx.patchState({ loading: false });
      }
    } else {
      ctx.patchState({
        products: [...state.products, ...newProducts]
      });
    }
    return;
  }

  @Action(ResetCart)
  ResetCart(ctx: StateContext<CartStateModel>) {
    ctx.patchState({
      products: []
    });
  }

  @Selector()
  static selectCartProducts(state: CartStateModel) {
    return state.products;
  }

  @Selector()
  static selectCartLoading(state: CartStateModel) {
    return state.loading;
  }

  @Selector()
  static selectCartError(state: CartStateModel) {
    return state.error;
  }
}
