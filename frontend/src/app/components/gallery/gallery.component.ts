import {Component} from '@angular/core';
import {ResponsiveImage} from "../../utilities/images/responsive-image";
import {ResponsiveImageService} from "../../utilities/images/responsive-image.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  template: `
    <section class="flex flex-col gap-1 mt-0 lg:mt-24">
      <div class="flex flex-col lg:flex-row lg:gap-1">
        <div
          class="w-full lg:w-1/2 h-[400px] max-h-[400px] lg:max-h-full lg:h-[120vh] relative bg-no-repeat overflow-hidden bg-cover bg-center">
          <img class="absolute inset-0 object-cover w-full h-full"
               [ngSrc]="responsiveGallery[0].asset.filePath"
               [alt]="responsiveGallery[0].asset.alt"
               [width]="responsiveGallery[0].asset.width"
               [height]="responsiveGallery[0].asset.height"
               [priority]="false"
               [ngSrcset]="responsiveGallery[0].attributes.breakpoints.ngSrcSet.asString"
               [sizes]="responsiveGallery[0].attributes.sizes.asString">
          <!--style="background-image: url('https://thelinebyk.com/cdn/shop/files/KYO-SLATE-GREY-banner_1080x.jpg?v=1712695721')">-->
          <div class="absolute inset-0">
            <div class="flex flex-col m-[10%] h-4/5 w-4/5 items-center justify-center lg:justify-end">
              <h2 class="text-4xl text-center text-button-header-white text-nowrap">ПЛАТЬЯ</h2>
              <a href="/shop">
                <button
                  class="font-bold text-button-header-white flex flex-col w-fit after:h-[2px] after:block after:bg-button-header-white after:w-full py-2"
                >В МАГАЗИН
                </button>
              </a>
            </div>
          </div>
        </div>
        <div
          class="w-full lg:w-1/2 h-[400px] max-h-[400px] lg:max-h-full mt-1 lg:mt-0 lg:h-[120vh] relative">
          <img class="absolute inset-0 object-contain object-cover w-full h-full"
               [ngSrc]="responsiveGallery[1].asset.filePath"
               [alt]="responsiveGallery[1].asset.alt"
               [width]="responsiveGallery[1].asset.width"
               [height]="responsiveGallery[1].asset.height"
               [priority]="false"
               [ngSrcset]="responsiveGallery[1].attributes.breakpoints.ngSrcSet.asString"
               [sizes]="responsiveGallery[1].attributes.sizes.asString">
          <!--style="background-image: url('https://thelinebyk.com/cdn/shop/files/THELINEBYK-LB-BRUNA-EIZA-2_1080x.jpg?v=1712695737')">-->
          <div class="absolute inset-0">
            <div class="flex flex-col m-[10%] h-4/5 w-4/5 items-center justify-center lg:justify-end">
              <h2 class="text-4xl text-center text-button-header-white text-nowrap">БРЮКИ</h2>
              <a href="/shop">

                <button
                  class="font-bold text-button-header-white flex flex-col w-fit after:h-[2px] after:block after:bg-button-header-white after:w-full py-2"
                >В МАГАЗИН
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <div
          class="before:block before:pt-[70%] max-h-[400px] lg:max-h-full w-full relative bg-no-repeat bg-cover bg-center">
          <img class="absolute inset-0 object-cover w-full h-full"
               [ngSrc]="responsiveGallery[2].asset.filePath"
               [alt]="responsiveGallery[2].asset.alt"
               [width]="responsiveGallery[2].asset.width"
               [height]="responsiveGallery[2].asset.height"
               [priority]="false"
               [ngSrcset]="responsiveGallery[2].attributes.breakpoints.ngSrcSet.asString"
               [sizes]="responsiveGallery[2].attributes.sizes.asString">
          <!--style="background-image: url('https://thelinebyk.com/cdn/shop/files/home-banner-dresses_1080x.jpg?v=1713550999')">-->
          <div class="absolute inset-0">
            <div class="flex flex-col m-[10%] h-4/5 w-4/5 items-center justify-center">
              <h2 class="text-4xl lg:text-6xl text-center text-button-header-white text-nowrap">КОСТЮМЫ</h2>
              <a href="/shop">

                <button
                  class="font-bold text-button-header-white flex flex-col w-fit after:h-[2px] after:block after:bg-button-header-white after:w-full py-2"
                >В МАГАЗИН
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class GalleryComponent {
  protected responsiveGallery: ResponsiveImage[];

  constructor(responsiveImageService: ResponsiveImageService) {
    this.responsiveGallery = this.images.map(item => responsiveImageService.convertGalleryItemToImageAsset(item, item.height));
  }

  readonly images = [
    {
      id: 1,
      image: "https://i.ibb.co/LC1Vzz2/IMG-7451.jpg",
      width: 853,
      height: 1280,
    },
    {
      id: 1,
      image: "https://i.ibb.co/sHmvfy3/DSCF5635.jpg",
      width: 4160,
      height: 6240,
    },
    {
      id: 1,
      image: "https://i.ibb.co/KmBBvtn/IMG-2768.jpg",
      width: 1178,
      height: 1280,
    }
  ]
}
