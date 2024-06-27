import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {GalleryItemService} from "../service/GalleryItem.service";
import {tap} from "rxjs";
import {GalleryItem} from "../../../models/GalleryItem";

export class GetAllGalleryItem {
  static readonly type = '[GalleryItem] Get All';
}

export interface GalleryItemStateModel {
  galleryItems: GalleryItem[] | undefined;
}

@State<GalleryItemStateModel>({
  name: 'GalleryItem',
  defaults: {
    galleryItems: undefined
  }
})
@Injectable()
export class GalleryItemState {
  constructor(private galleryItemService: GalleryItemService) {
  }

  @Action(GetAllGalleryItem)
  getAllGalleryItem(ctx: StateContext<GalleryItemStateModel>) {
    return this.galleryItemService.getAllGalleryItem().pipe(
      tap((response) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          galleryItems: response,
        })
      })
    );
  }

  @Selector([GalleryItemState])
  static selectGalleryItem(state: GalleryItemStateModel) {
    return state.galleryItems;
  }
}
