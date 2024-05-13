import {Component} from '@angular/core';
import {HeaderButtonComponent} from "../../utilities/header-button/header-button.component";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {HeaderButton} from "../../types/HeaderButton.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HeaderButtonComponent,
    NgClass,
    NgForOf,
    NgIf,
    NgOptimizedImage,
  ],
  template: `
    <header class="top-0 bg-button-header-white fixed w-full z-30">
      <div class="flex justify-between py-5">
        <div class="flex items-center">
          <a [href]="button.link" *ngFor="let button of this.headerButtons[0]">
            <header-button class="px-4 hidden lg:flex">{{ button.name }}</header-button>
          </a>
          <a (click)="clickMenu()"
             class="pl-5 cursor-pointer w-[44px] h-[44px] align-middle flex lg:hidden justify-center items-center">
            <div class="inline-block relative w-[30px] h-[30px]">
            <span
              [ngClass]="statusMenuActive ? '[transform:rotate(45deg)_translate3d(6px,5.5px,0)]' : ''"
              class="transition-all duration-500 absolute left-[3px] top-[6px] bg-button-header-black w-[23px] h-[2px]"></span>
              <span
                [ngClass]="statusMenuActive ? 'opacity-0' : 'opacity-100'"
                class="transition-all duration-500 absolute left-[3px] top-[14px] bg-button-header-black w-[23px] h-[2px]"></span>
              <span
                [ngClass]="statusMenuActive ? '[transform:rotate(-45deg)_translate3d(5.5px,-5px,0)]' : ''"
                class="transition-all duration-500 absolute left-[3px] top-[22px] bg-button-header-black w-[23px] h-[2px]"></span>
            </div>
          </a>
          <a class="h-fit cursor-pointer lg:hidden flex items-center justify-center px-5 py-1.5">
            <svg class="w-[18px] h-[18px] fill-button-header-white" viewBox="0 0 64 64">
              <path class="stroke-[4px] stroke-button-header-black"
                    d="M32.012,59.616c-1.119-.521-2.365-1.141-3.707-1.859a79.264,79.264,0,0,1-11.694-7.614C6.316,42,.266,32.6.254,22.076,0.244,12.358,7.871,4.506,17.232,4.5a16.661,16.661,0,0,1,11.891,4.99l2.837,2.889,2.827-2.9a16.639,16.639,0,0,1,11.874-5.02h0c9.368-.01,17.008,7.815,17.021,17.539,0.015,10.533-6.022,19.96-16.312,28.128a79.314,79.314,0,0,1-11.661,7.63C34.369,58.472,33.127,59.094,32.012,59.616Z"></path>
            </svg>
          </a>
        </div>
        <div class="flex items-center">
          <a class="cursor-pointer" href="/">
            <img class="w-[140px] h-auto lg:w-[160px]"
                 src="https://x-lines.ru/letters/i/cyrillicscript/0444/030326/20/0/q3zsa5uxq3o1hau1cfzge.png"
                 alt="The Line by K"
                 itemprop="logo">
          </a>
        </div>
        <div class="flex items-center">
          <a [href]="button.link" *ngFor="let button of this.headerButtons[1]">
            <header-button class="px-4 hidden lg:flex">{{ button.name }}</header-button>
          </a>

          <a class="h-fit cursor-pointer flex items-center justify-center px-5 py-1.5">
            <svg class="w-[18px] h-[18px] fill-button-header-white" viewBox="0 0 30 30"
                 xmlns="http://www.w3.org/2000/svg">
              <title>Search</title>
              <g fill="none" class="stroke-[2px] stroke-button-header-black" fill-rule="evenodd" stroke-linecap="round"
                 stroke-linejoin="round">
                <g transform="translate(-1335.000000, -30.000000)" stroke="button-header-black">
                  <g transform="translate(1336.000000, 31.000000)">
                    <circle cx="12" cy="12" r="12"></circle>
                    <line x1="27" y1="27" x2="20.475" y2="20.475" id="Path"></line>
                  </g>
                </g>
              </g>
            </svg>
          </a>

          <a class="h-fit cursor-pointer flex items-center justify-center pr-5 py-1.5">
            <svg class="w-[21px] h-[29px] fill-button-header-white" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512"><title>Basket</title>
              <path
                class="stroke-[25px] stroke-button-header-black"
                d="M68.4 192A20.38 20.38 0 0048 212.2a17.87 17.87 0 00.8 5.5L100.5 400a40.46 40.46 0 0039.1 29.5h232.8a40.88 40.88 0 0039.3-29.5l51.7-182.3.6-5.5a20.38 20.38 0 00-20.4-20.2H68"
                fill="none" stroke-linejoin="round"></path>
              <path fill="none" class="stroke-[25px] stroke-button-header-black" stroke-linejoin="round"
                    d="M160 192l96-128 96 128"></path>
            </svg>
          </a>

        </div>
      </div>
    </header>
    <div *ngIf="statusMenuActive"
         class="transition-all px-10 pt-7 mt-[84px] z-40 fixed inset-0 bg-button-header-white block lg:hidden">
      <div class="flex flex-col">
        <a [href]="button.link" *ngFor="let button of this.headerButtons[0]">
          <header-button class="flex">{{ button.name }}</header-button>
        </a>
        <span class="my-3 opacity-50 bg-button-header-black w-full h-[1px]"></span>
        <a [href]="button.link" *ngFor="let button of this.headerButtons[1]">
          <header-button class="flex">{{ button.name }}</header-button>
        </a>
      </div>
    </div>
    <div class="mb-[84px] lg:mb-[88.5px]"></div>
  `,
})
export class HeaderComponent {
  constructor(protected router: Router) {
  }


  statusMenuActive: boolean = false;

  headerButtons: Array<Array<HeaderButton>> = [
    [
      {
        name: "О нас",
        link: "about-us"
      },
      {
        name: "Shop",
        link: "shop"
      },
      {
        name: "The line",
        link: "about-us"
      },
    ],
    [
      {
        name: "Account",
        link: "profile"
      },
      {
        name: "Wishlist",
        link: "about-us"
      },
    ]
  ];

  clickMenu() {
    this.statusMenuActive = !this.statusMenuActive;
  }
}
