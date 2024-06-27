import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {ProductState} from "./store/product/state/Product.state";
import {CategoryState} from "./store/category/state/Category.state";
import {GalleryItemState} from "./store/galleryItem/state/GalleryItem.state";
import {AuthState} from "./store/auth/state/Auth.state";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {IMAGE_LOADER, ImageLoaderConfig} from "@angular/common";
import {environment} from "../environments/environment";
import {CartState} from "./store/cart/state/Cart.state";
import {WishListState} from "./store/wishlist/state/Cart.state";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `${environment.apiUrl}/files/get?src=${config.src}&width=${config.width}`;
      },
    },
    importProvidersFrom(HttpClientModule, NgxsStoragePluginModule.forRoot(), NgxsModule.forRoot([ProductState, CategoryState, GalleryItemState, AuthState, CartState, WishListState]))
  ]
};
