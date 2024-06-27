import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Product} from "../../../models/Product";
import {AuthState} from "../../auth/state/Auth.state";
import {catchError, tap, throwError} from "rxjs";
import {WishListService} from "../service/WishList.service";

export class ToggleProductInWishList {
  static readonly type = '[WishList] Toggle Product';

  constructor(public payload: Product) {
  }
}

export class AddAllProductsToWishList {
  static readonly type = '[WishList] Add All Products';

  constructor(public payload: Product[], public token: string | null) {
  }
}

export class ResetWishList {
  static readonly type = '[WishList] Reset WishList';
}

export interface WishListStateModel {
  products: Product[];
  loading: boolean;
  error: Error | undefined;
}

@State<WishListStateModel>({
  name: 'WishList',
  defaults: {
    products: [],
    loading: false,
    error: undefined,
  }
})
@Injectable()
export class WishListState {
  constructor(private wishListService: WishListService, private store: Store) {
  }

  @Action(ToggleProductInWishList)
  ToggleProductInWishList(ctx: StateContext<WishListStateModel>, action: ToggleProductInWishList) {
    const state = ctx.getState();
    const isProductInWishList = state.products.some(product => product.id === action.payload.id);
    const token = this.store.selectSnapshot(AuthState.token);

    if (token) {
      ctx.patchState({loading: true});

      const request = isProductInWishList
        ? this.wishListService.removeProductFromWishList(action.payload.id, token)
        : this.wishListService.addProductToWishList(action.payload.id, token);

      return request.pipe(
        tap(() => {
          const updatedProducts = isProductInWishList
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
      const updatedProducts = isProductInWishList
        ? state.products.filter(product => product.id !== action.payload.id)
        : [...state.products, action.payload];

      ctx.patchState({
        products: updatedProducts
      });

      return;
    }
  }

  @Action(AddAllProductsToWishList)
  AddAllProductsToWishList(ctx: StateContext<WishListStateModel>, action: AddAllProductsToWishList) {
    const state = ctx.getState();

    const newProducts = action.payload.filter(product =>
      !state.products.some(existingProduct => existingProduct.id === product.id)
    );

    if (action.token) {
      ctx.patchState({loading: true});

      if (newProducts.length > 0) {
        return this.wishListService.addAllProductToWishList(newProducts.map(product => product.id), action.token).pipe(
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

  @Action(ResetWishList)
  ResetWishList(ctx: StateContext<WishListStateModel>) {
    ctx.patchState({
      products: []
    });
  }

  @Selector()
  static selectWishListProducts(state: WishListStateModel) {
    return state.products;
  }

  @Selector()
  static selectWishListLoading(state: WishListStateModel) {
    return state.loading;
  }

  @Selector()
  static selectWishListError(state: WishListStateModel) {
    return state.error;
  }
}
