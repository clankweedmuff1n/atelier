import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {DiscountElementComponent} from "../../utilities/discount-element/discount-element.component";
import {Select} from "@ngxs/store";
import {ProductState} from "../../store/product/state/Product.state";
import {Observable} from "rxjs";
import {Product} from "../../models/product";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    DiscountElementComponent,
    AsyncPipe,
    NgForOf,
    NgClass,
    NgIf
  ],
  template: `
    <app-header/>
    <section>
      <h2 class="lg:text-left text-center py-8 px-2.5 text-xl">Летняя коллекция</h2>
      <div class="hidden lg:flex py-4 border-b justify-between items-center border-color-gray">
        <div class="flex">
          <h4 class="px-2.5">View as</h4>
          <a href="/shop?display=grid">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M8 8H4V4h4zm6-4h-4v4h4zm6 0h-4v4h4zM8 10H4v4h4zm6 0h-4v4h4zm6 0h-4v4h4zM8 16H4v4h4zm6 0h-4v4h4zm6 0h-4v4h4z"/>
            </svg>
          </a>
          <a href="/shop?display=row">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M9 19h12v-2H9zm0-6h12v-2H9zm0-8v2h12V5zm-4-.5a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 5 4.5m0 6a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 5 10.5m0 6a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 5 16.5"/>
            </svg>
          </a>
        </div>
        <div class="flex items-center">
          <h4>Sort by</h4>
          <svg class="mt-1 mx-2.5" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 14 14">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  d="M.5 3.85L6.65 10a.48.48 0 0 0 .7 0l6.15-6.15"/>
          </svg>
        </div>
      </div>
      <div class="flex">
        <div class="hidden mt-8 w-1/5 lg:flex flex-col">
          <div class="flex first:pt-0 pt-8 pb-4 text-xs pl-4 border-color-gray border-b-[0.5px] uppercase font-bold">color</div>
          <div class="flex first:pt-0 pt-8 pb-4 text-xs pl-4 border-color-gray border-b-[0.5px] uppercase font-bold">category</div>
          <div class="flex first:pt-0 pt-8 pb-4 text-xs pl-4 border-color-gray border-b-[0.5px] uppercase font-bold">fabric</div>
        </div>
        <div
          [ngClass]="{
              'flex flex-wrap': display == 'grid',
              }"
          class="w-full lg:w-4/5">
          <ng-container *ngFor="let product of this.products$ | async">
            <div
              [ngClass]="{
              'flex-row border-t-[0.5px] first:border-0': display == 'row',
              'flex-col w-1/2 lg:w-1/3 border-b-[0.5px]': display == 'grid',
              }"
              class="py-8 px-2.5 lg:pr-0 lg:pl-2.5 flex border-color-gray"
              (click)="this.router.navigate(['products', product.link])">
              <img
                [ngClass]="{
              'lg:w-[400px] lg:h-[600px]': display == 'grid',
              }"
                class="min-h-0 lg:max-h-full lg:w-[240px] object-cover lg:h-[360px]" [src]="product.gallery[0].image"/>
              <div
                [ngClass]="{
              'pl-0 pt-4': display == 'grid',
              }"
                class="h-fit pl-8">
                <h4 class="font-medium">{{ product.name }}</h4>
                <h4 class="font-normal opacity-70">₽ {{ product.price }}.00</h4>
                <p *ngIf="display === 'row'" class="font-normal mt-4 opacity-70">{{ product.description }}</p>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </section>
    <app-discount-element/>
    <app-footer/>
  `,
})
export class ShopPageComponent {
  @Select(ProductState.selectProducts) products$!: Observable<Product[]>;
  @Select(ProductState.selectLoading) loading$!: Observable<boolean>;
  @Select(ProductState.selectError) error$!: Observable<Error | undefined>;

  display: string = "grid";

  constructor(protected router: Router, private route: ActivatedRoute) {
    const display: string | null = this.route.snapshot.queryParamMap.get("display");
    if (display != null) this.display = display;
  }
}
