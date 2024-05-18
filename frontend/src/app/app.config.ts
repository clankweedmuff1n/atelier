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
import {IMAGE_CONFIG} from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920]
      }
    },
    importProvidersFrom(HttpClientModule, NgxsStoragePluginModule.forRoot(), NgxsModule.forRoot([ProductState, CategoryState, GalleryItemState, AuthState]))
  ]
};
