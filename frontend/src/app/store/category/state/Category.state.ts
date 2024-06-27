import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {CategoryService} from "../service/Category.service";
import {tap} from "rxjs";
import {Category} from "../../../models/Category";

export class GetAllCategory {
  static readonly type = '[Category] Get All';
}

export interface CategoryStateModel {
  categories: Category[] | undefined;
}

@State<CategoryStateModel>({
  name: 'Category',
  defaults: {
    categories: undefined
  }
})
@Injectable()
export class CategoryState {
  constructor(private categoryService: CategoryService) {
  }

  @Action(GetAllCategory)
  getAllCategory(ctx: StateContext<CategoryStateModel>) {
    return this.categoryService.getAllCategory().pipe(
      tap((response) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          categories: response
        });
      })
    );
  }

  @Selector([CategoryState])
  static selectCategories(state: CategoryStateModel) {
    return state.categories;
  }
}
