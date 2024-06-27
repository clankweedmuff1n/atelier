import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {ProductService} from "../service/Product.service";
import {catchError, tap, throwError} from "rxjs";
import {Product} from "../../../models/Product";

export class GetAllProduct {
  static readonly type = '[Product] Get All';
}

export interface ProductStateModel {
  products: Product[] | undefined;
  loading: boolean;
  error: Error | undefined;
}

@State<ProductStateModel>({
  name: 'Product',
  defaults: {
    products: undefined,
    loading: false,
    error: undefined,
  }
})
@Injectable()
export class ProductState {
  constructor(private productService: ProductService) {
  }

  @Action(GetAllProduct)
  getAllProduct(ctx: StateContext<ProductStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loading: true,
      error: undefined,
    });
    return this.productService.getAllProduct().pipe(
      tap((response) => {
        ctx.setState({
          ...state,
          products: response,
          loading: false,
          error: undefined,
        });
      }),
      catchError(error => {
        ctx.setState({...state, loading: false, error: error});
        return throwError(() => new Error('Error when fetching products'));
      })
    );
  }

  @Selector([ProductState])
  static selectProducts(state: ProductStateModel) {
    return state.products;
  }

  @Selector([ProductState])
  static selectLoading(state: ProductStateModel) {
    return state.loading;
  }

  @Selector([ProductState])
  static selectError(state: ProductStateModel) {
    return state.error;
  }
}
