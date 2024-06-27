import {Component, Input, OnInit} from '@angular/core';
import {NgxSplideModule} from "ngx-splide";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Product} from "../../models/Product";
import {ResponsiveImage} from "../../utilities/images/responsive-image";
import {ResponsiveImageService} from "../../utilities/images/responsive-image.service";
import {Select, Store} from "@ngxs/store";
import {CartState, ToggleProductInCart} from "../../store/cart/state/Cart.state";
import {ToggleProductInWishList, WishListState} from "../../store/wishlist/state/Cart.state";

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    NgxSplideModule,
    NgForOf,
    AsyncPipe,
    NgOptimizedImage,
    NgIf,
    NgClass
  ],
  template: `
    <section class="px-5 py-12 flex flex-col">
      <a href="/shop">
        <h3 class="uppercase w-full font-bold text-right mb-4">View all</h3>
      </a>
      <splide
        class="p"
        [options]="{ breakpoints: {
            '1024': {perPage: 3},
            '768': {perPage: 2},
            '640': {perPage: 1, gap: 2}
        }, type: 'loop', perPage: 4, keyboard: false, gap: 20,
         classes: {
            pagination: 'splide__pagination !bottom-[-1.5rem]',
         }}">
        <splide-slide *ngFor="let product of this.products$ | async; let i = index">
          <div class="flex flex-col">
            <button (click)="this.router.navigate(['products', product.link])">
              <img class="min-h-0 lg:max-h-full h-full"
                   [ngSrc]="currentProductGallery[i][0].asset.filePath"
                   [alt]="currentProductGallery[i][0].asset.alt"
                   [width]="currentProductGallery[i][0].asset.width"
                   [height]="currentProductGallery[i][0].asset.height"
                   [priority]="true"
                   [ngSrcset]="currentProductGallery[i][0].attributes.breakpoints.ngSrcSet.asString"
                   [sizes]="currentProductGallery[i][0].attributes.sizes.asString"/>
            </button>
            <div class="h-fit mt-2 flex justify-between">
              <div>
                <h4 class="font-medium">{{ product.name }}</h4>
                <h4 class="font-medium">₽ {{ product.price }}.00</h4>
              </div>
              <div class="flex justify-center gap-4 items-center">
                <button (click)="toggleProductInWishList(product)">
                  <svg class="w-[20px] h-[25px] fill-button-header-white" viewBox="0 0 64 64">
                    <path class="stroke-[3px] stroke-button-header-black" [ngClass]="checkIfProductInWishList(product) ? 'fill-black' : 'fill-none'" d="M32.012,59.616c-1.119-.521-2.365-1.141-3.707-1.859a79.264,79.264,0,0,1-11.694-7.614C6.316,42,.266,32.6.254,22.076,0.244,12.358,7.871,4.506,17.232,4.5a16.661,16.661,0,0,1,11.891,4.99l2.837,2.889,2.827-2.9a16.639,16.639,0,0,1,11.874-5.02h0c9.368-.01,17.008,7.815,17.021,17.539,0.015,10.533-6.022,19.96-16.312,28.128a79.314,79.314,0,0,1-11.661,7.63C34.369,58.472,33.127,59.094,32.012,59.616Z"></path>
                  </svg>
                </button>
                <button (click)="toggleProductInCart(product)">
                  <svg class="w-[21px] h-[29px] fill-button-header-white" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 512 512"><title>Basket</title>
                    <path
                      [ngClass]="checkIfProductInCart(product) ? 'fill-black' : 'fill-none'"
                      class="stroke-[25px] stroke-button-header-black"
                      d="M68.4 192A20.38 20.38 0 0048 212.2a17.87 17.87 0 00.8 5.5L100.5 400a40.46 40.46 0 0039.1 29.5h232.8a40.88 40.88 0 0039.3-29.5l51.7-182.3.6-5.5a20.38 20.38 0 00-20.4-20.2H68"
                      fill="none" stroke-linejoin="round"></path>
                    <path
                      fill="none" class="stroke-[25px] stroke-button-header-black" stroke-linejoin="round"
                      d="M160 192l96-128 96 128"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </splide-slide>
      </splide>
    </section>
  `,
})
export class CatalogueComponent implements OnInit {
  @Input({required: true}) products$!: Observable<Product[]>;
  protected currentProductGallery: ResponsiveImage[][] = [];
  private responsiveImageService: ResponsiveImageService;

  @Select(CartState.selectCartProducts) cart$!: Observable<Product[]>;
  @Select(WishListState.selectWishListProducts) wishList$!: Observable<Product[]>;

  protected productsInCart: Product[] = [];
  protected productsInWishList: Product[] = [];

  constructor(
    protected router: Router,
    responsiveImageService: ResponsiveImageService,
    private store: Store,
  ) {
    this.responsiveImageService = responsiveImageService;
    this.cart$.subscribe({
      next: (products) => {
        this.productsInCart = products;
      }
    });
    this.wishList$.subscribe({
      next: (products) => {
        this.productsInWishList = products;
      }
    });
  }

  ngOnInit(): void {
    this.products$.subscribe({
      next: products => {
        products.forEach(product => {
          this.currentProductGallery.push(product.gallery.map(item => this.responsiveImageService.convertGalleryItemToImageAsset(item, item.height)));
        })
      }
    });
  }

  checkIfProductInCart(product: Product): boolean {
    return this.productsInCart.some(cartProduct => cartProduct.id === product.id);
  }

  checkIfProductInWishList(product: Product): boolean {
    return this.productsInWishList.some(cartProduct => cartProduct.id === product.id);
  }

  toggleProductInCart(product: Product) {
    this.store.dispatch(new ToggleProductInCart(product))
    this.cart$.subscribe(products => this.productsInCart = products);
  }

  toggleProductInWishList(product: Product) {
    this.store.dispatch(new ToggleProductInWishList(product))
    this.wishList$.subscribe(products => this.productsInCart = products);
  }

  /*catalogueArray = [
    {
      name: "YONAS DRESS",
      img: "https://thelinebyk.com/cdn/shop/files/yonas-dress-black-the-line-by-k-504564_720x.jpg?v=1712797017",
      price: 320.00,
      currency: "$",
    },
    {
      name: "JULIETA DRESS",
      img: "https://thelinebyk.com/cdn/shop/files/julieta-dress-vanilla-the-line-by-k-123569_720x.jpg?v=1712796957",
      price: 245.00,
      currency: "$",
    },
    {
      name: "ATLAS SHORT",
      img: "https://thelinebyk.com/cdn/shop/files/julieta-dress-vanilla-the-line-by-k-123569_720x.jpg?v=1712796957",
      price: 159.00,
      currency: "$",
    },
    {
      name: "BIRCH DRESS",
      img: "https://thelinebyk.com/cdn/shop/files/atlas-short-cherry-red-cherry-red-the-line-by-k-897584_720x.jpg?v=1711719730",
      price: 249.00,
      currency: "$",
    },
    {
      name: "ESSEX SHORT",
      img: "https://thelinebyk.com/cdn/shop/files/birch-dress-black-the-line-by-k-522542_720x.jpg?v=1712796921",
      price: 179.00,
      currency: "$",
    },
    {
      name: "GIVY TOP",
      img: "https://thelinebyk.com/cdn/shop/files/essex-short-black-the-line-by-k-611395_460x.jpg?v=1711719731",
      price: 165.00,
      currency: "$",
    },
    {
      name: "NESS CAPE",
      img: "https://thelinebyk.com/cdn/shop/files/givy-top-vanilla-the-line-by-k-147804_460x.jpg?v=1712796924",
      price: 199.00,
      currency: "$",
    },
    {
      name: "INESSA TOP",
      img: "https://thelinebyk.com/cdn/shop/files/ness-cape-vanilla-the-line-by-k-363842_460x.jpg?v=1712796958",
      price: 95.00,
      currency: "$",
    },
    {
      name: "KYO TUBE TOP",
      img: "https://thelinebyk.com/cdn/shop/products/inessa-top-black-the-line-by-k-214936_460x.jpg?v=1710359869",
      price: 110.00,
      currency: "$",
    },
    {
      name: "JANAE SKIRT",
      img: "https://thelinebyk.com/cdn/shop/products/kyo-tube-top-slate-grey-the-line-by-k-419640_720x.jpg?v=1708749513",
      price: 175.00,
      currency: "$",
    },
    {
      name: "JACE DRESS",
      img: "https://thelinebyk.com/cdn/shop/products/janae-skirt-chartreuse-the-line-by-k-462371_720x.jpg?v=1708749513",
      price: 179.00,
      currency: "$",
    },
    {
      name: "SOPHIE TANK DRESS",
      img: "https://thelinebyk.com/cdn/shop/files/THELINEBYK_JACE_SLATE_GREY_FRT_1_720x.jpg?v=1708725639",
      price: 145.00,
      currency: "$",
    },
  ];*/
}
