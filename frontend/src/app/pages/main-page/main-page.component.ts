import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {ContentComponent} from "../../components/content/content.component";
import {CatalogueComponent} from "../../components/catalogue/catalogue.component";
import {LookBookComponent} from "../../components/look-book/look-book.component";
import {DiscountElementComponent} from "../../utilities/discount-element/discount-element.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {GalleryComponent} from "../../components/gallery/gallery.component";
import {DELETEComponent} from "../../components/delete/delete.component";
import {Select, Store} from "@ngxs/store";
import {GetAllProduct, ProductState} from "../../store/product/state/Product.state";
import {Observable} from "rxjs";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeaderComponent,
    ContentComponent,
    CatalogueComponent,
    LookBookComponent,
    DiscountElementComponent,
    FooterComponent,
    GalleryComponent,
    DELETEComponent
  ],
  template: `
    <app-header />
    <app-content/>
    <app-catalogue [products$]="products$"/>
    <app-look-book/>
    <app-gallery/>
    <app-discount-element/>
    <app-footer/>
  `,
})
export class MainPageComponent {
  @Select(ProductState.selectProducts) products$!: Observable<Product[]>;
  @Select(ProductState.selectLoading) loading$!: Observable<boolean>;
  @Select(ProductState.selectError) error$!: Observable<Error | undefined>;

  constructor(private store: Store) {
    //localStorage.clear();
    /*this.products$.subscribe({
      next: (products) => {
        this.loading$.subscribe({
          next: loading => {
            this.error$.subscribe({
              next: error => {
                console.log(products)
                console.log(loading)
                console.log(error)
                if (error !== undefined && !loading && !products.length) this.store.dispatch(new GetAllProduct());
              }
            });
          }
        });
      }
    });*/
    this.products$.subscribe({
      next: (products) => {
        if (!products || products.length === 0) this.store.dispatch(new GetAllProduct());
      }
    });
  }
}
