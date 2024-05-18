import {Component, Input} from '@angular/core';
import {NgxSplideModule} from "ngx-splide";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Product} from "../../models/product";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    NgxSplideModule,
    NgForOf,
    AsyncPipe
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
        <!--<splide-slide *ngFor="let product of catalogueArray">
          <div class="flex flex-col">
            <img class="h-full" [src]="product.img"/>
            <div class="h-fit mt-2">
              <h4 class="font-medium">{{ product.name }}</h4>
              <h4 class="font-medium">{{ product.currency }} {{ product.price }}.00</h4>
            </div>
          </div>
        </splide-slide>-->
        <splide-slide *ngFor="let product of this.products$ | async">
          <div class="flex flex-col" (click)="this.router.navigate(['products', product.link])">
            <img class="min-h-0 lg:max-h-full h-full" [src]="product.gallery[0].image"/>
            <div class="h-fit mt-2">
              <h4 class="font-medium">{{ product.name }}</h4>
              <h4 class="font-medium">₽ {{ product.price }}.00</h4>
            </div>
          </div>
        </splide-slide>
      </splide>
    </section>
  `,
})
export class CatalogueComponent {
  @Input({required: true}) products$!: Observable<Product[]>;

  constructor(protected router: Router) {
  }

  catalogueArray = [
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
  ];
}
