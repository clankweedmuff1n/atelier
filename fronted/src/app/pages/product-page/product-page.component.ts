import {Component} from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {DiscountElementComponent} from "../../utilities/discount-element/discount-element.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {ActivatedRoute} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {GetAllProduct, ProductState} from "../../store/product/state/Product.state";
import {Observable} from "rxjs";
import {Product} from "../../models/product";
import {map} from "rxjs/operators";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {NgxSplideModule} from "ngx-splide";
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective
} from "@spartan-ng/ui-tabs-helm";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    HeaderComponent,
    DiscountElementComponent,
    FooterComponent,
    AsyncPipe,
    NgIf,
    NgForOf,
    NgxSplideModule,
    HlmTabsListComponent,
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsTriggerDirective,
  ],
  template: `
    <app-header/>
    <ng-container *ngIf="currentProduct | async as product">
      <div class="flex flex-col lg:flex-row-reverse lg:justify-between">
        <splide *ngIf="product.gallery.length > 1"
                class="w-full lg:w-1/2"
                [options]="{ breakpoints: {
            '640': {perPage: 1, gap: 0}
        }, type: 'loop', perPage: 1, keyboard: false, gap: 20,
         classes: {
            pagination: 'splide__pagination !bottom-[-1.5rem]',
         }}">
          <splide-slide *ngFor="let galleryItem of product.gallery">
            <img class="max-h-[574px] lg:max-h-full [cursor:url(data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjQ0LjA1IiBoZWlnaHQ9IjQ0LjA1IiB2aWV3Qm94PSIwIDAgNDQuMDUgNDQuMDUiPjxwYXRoIGQ9Ik00NS4wNSwyM2EyMiwyMiwwLDEsMC0yMiwyMkEyMiwyMiwwLDAsMCw0NS4wNSwyM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIC0xKSIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxwYXRoIGQ9Ik0yMywxNi42NVYyOS40TTI5LjQsMjNIMTYuNjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIC0xKSIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQiLz48L3N2Zz4=)_22_22,zoom-in] lg:object-contain lg:w-full h-full" (click)="toggleImageModal(galleryItem.image)" [src]="galleryItem.image" [alt]="product.name"/>
          </splide-slide>
        </splide>
        <img *ngIf="product.gallery.length <= 1" class="max-h-[574px] lg:max-h-full [cursor:url(data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjQ0LjA1IiBoZWlnaHQ9IjQ0LjA1IiB2aWV3Qm94PSIwIDAgNDQuMDUgNDQuMDUiPjxwYXRoIGQ9Ik00NS4wNSwyM2EyMiwyMiwwLDEsMC0yMiwyMkEyMiwyMiwwLDAsMCw0NS4wNSwyM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIC0xKSIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxwYXRoIGQ9Ik0yMywxNi42NVYyOS40TTI5LjQsMjNIMTYuNjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIC0xKSIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQiLz48L3N2Zz4=)_22_22,zoom-in] w-full lg:w-1/2 h-full"
             (click)="toggleImageModal(product.gallery.length === 0 ? product.preview.image : product.gallery[0].image)"
             [src]="product.gallery.length === 0 ? product.preview.image : product.gallery[0].image"
             [alt]="product.name"/>
        <div class="p-6 lg:p-24">
          <div class="pt-9">
            <h2 class="font-medium uppercase">{{ product.name }}</h2>

            <hlm-tabs tab="description" class="w-full">
              <div class="mt-2 md:mt-4">
                <hlm-tabs-list aria-label="tabs example">
                  <button
                    class="inline-block after:w-0 uppercase after:h-[1px] after:block after:bg-button-header-black after:transition-all hover:after:w-full font-normal data-[state=active]:after:w-full mr-3 my-2"
                    hlmTabsTrigger="description">Description
                  </button>
                  <button
                    class="inline-block after:w-0 uppercase after:h-[1px] after:block after:bg-button-header-black after:transition-all hover:after:w-full font-normal data-[state=active]:after:w-full mr-3 my-2"
                    hlmTabsTrigger="composition">Composition & Care
                  </button>
                  <button
                    class="inline-block after:w-0 uppercase after:h-[1px] after:block after:bg-button-header-black after:transition-all hover:after:w-full font-normal data-[state=active]:after:w-full mr-3 my-2"
                    hlmTabsTrigger="details">Details
                  </button>
                </hlm-tabs-list>
              </div>

              <div class="min-h-[105px] py-3.5 mt-0" hlmTabsContent="description">
                <p class="text-sm">{{ product.description }}</p>
              </div>
              <div class="min-h-[105px] py-3.5 mt-0" hlmTabsContent="composition">
                <p class="text-sm" *ngFor="let composition of product.composition">- {{ composition }}</p>
              </div>
              <div class="min-h-[105px] py-3.5 mt-0" hlmTabsContent="details">
                <p class="text-sm" *ngFor="let detail of product.details">- {{ detail }}</p>
              </div>
            </hlm-tabs>
          </div>
          <p class="py-4">₽ {{ product.price }}.00</p>
          <div class="flex justify-center items-center">
            <button
              class="uppercase py-[16px] w-full bg-button-header-black text-button-header-white rounded-md font-medium my-6">
              Добавить в корзину
            </button>
            <svg class="mx-6 w-[28px] h-[28px] fill-button-header-white" viewBox="0 0 64 64">
              <path class="stroke-[4px] stroke-button-header-black"
                    d="M32.012,59.616c-1.119-.521-2.365-1.141-3.707-1.859a79.264,79.264,0,0,1-11.694-7.614C6.316,42,.266,32.6.254,22.076,0.244,12.358,7.871,4.506,17.232,4.5a16.661,16.661,0,0,1,11.891,4.99l2.837,2.889,2.827-2.9a16.639,16.639,0,0,1,11.874-5.02h0c9.368-.01,17.008,7.815,17.021,17.539,0.015,10.533-6.022,19.96-16.312,28.128a79.314,79.314,0,0,1-11.661,7.63C34.369,58.472,33.127,59.094,32.012,59.616Z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div *ngIf="isModalActive" class="z-[60]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <button
          (click)="toggleImageModal()"
          class="fixed z-50 top-[96px] lg:top-[102px] right-[24px] flex h-12 w-12 flex-shrink-0 items-center bg-button-header-white justify-center rounded-full sm:h-10 sm:w-10">
          <svg class="" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"/>
          </svg>
        </button>
        <div class="fixed w-full h-full inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="overflow-hidden fixed inset-0 z-10 w-screen md:overflow-y-auto">
          <div class="flex min-h-full mt-16 md:mt-0 md:items-end justify-center p-4 text-center items-center sm:p-0">

            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-full">
              <div class="bg-white">
                <div class="sm:flex sm:items-start">
                  <img (click)="toggleImageModal()" class="z-[60] w-full h-full" [src]="this.currentImageUrl">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
    <app-discount-element/>
    <app-footer/>
  `,
})
export class ProductPageComponent {
  @Select(ProductState.selectProducts) products$!: Observable<Product[]>;
  @Select(ProductState.selectLoading) loading$!: Observable<boolean>;
  @Select(ProductState.selectError) error$!: Observable<Error | undefined>;

  private readonly link: string | null = null;
  protected currentProduct?: Observable<Product | undefined>;
  isModalActive: boolean = false;
  currentImageUrl: string | undefined = undefined;

  toggleImageModal(imageUrl?: string) {
    if (!this.isModalActive) this.currentImageUrl = imageUrl;
    else this.currentImageUrl = undefined;
    this.isModalActive = !this.isModalActive;
  }

  constructor(private route: ActivatedRoute, private store: Store) {
    window.scroll({
      top: 0,
    });
    this.link = this.route.snapshot.paramMap.get('link');
    this.products$.subscribe({
      next: (products) => {
        if (!products) this.store.dispatch(new GetAllProduct());
        else this.currentProduct = this.products$.pipe(map(products => products.find(product => product.link === this.link)));
      }
    });
  }
}
