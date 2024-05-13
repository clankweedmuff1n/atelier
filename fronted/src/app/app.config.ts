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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, NgxsStoragePluginModule.forRoot(), NgxsModule.forRoot([ProductState, CategoryState, GalleryItemState, AuthState]))
  ]
};
