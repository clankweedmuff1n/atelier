import { Component } from '@angular/core';
import {GalleryItem} from "../../models/GalleryItem";
import {ResponsiveImage} from "../../utilities/images/responsive-image";
import {ResponsiveImageService} from "../../utilities/images/responsive-image.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    NgOptimizedImage,
  ],
  template: `
    <section class="">
      <div class="flex flex-col lg:flex-row gap-1">
        <div
          class="w-full lg:w-1/2 h-[400px] max-h-[400px] lg:max-h-full lg:h-[120vh] relative">
          <img class="absolute inset-0 h-[400px] max-h-[400px] lg:max-h-full lg:h-[120vh] object-cover"
               [ngSrc]="responsiveGallery[0].asset.filePath"
               [alt]="responsiveGallery[0].asset.alt"
               [width]="responsiveGallery[0].asset.width"
               [height]="responsiveGallery[0].asset.height"
               [priority]="true"
               [ngSrcset]="responsiveGallery[0].attributes.breakpoints.ngSrcSet.asString"
               [sizes]="responsiveGallery[0].attributes.sizes.asString">
          <!--style="background-image: url('https://i.ibb.co/c6Q3N5m/DSCF4879.jpg')"-->
          <!--style="background-image: url('https://thelinebyk.com/cdn/shop/files/MOBILE-EDIT-3_900x.jpg?v=1712696066')">-->
          <div class="absolute inset-0">
            <div class="flex flex-col m-[10%] h-4/5 w-4/5 items-center justify-center">
              <h2 class="text-4xl text-center text-button-header-white text-nowrap">SS24<br/>COLLECTION</h2>
              <button
                class="font-bold text-button-header-white flex flex-col w-fit after:h-[2px] after:block after:bg-button-header-white after:w-full py-2"
              >SHOP
              </button>
            </div>
          </div>
        </div>
        <div
          class="w-full lg:w-1/2 h-[400px] max-h-[400px] lg:max-h-full lg:h-[120vh] relative">
          <!--[width]="responsiveGallery[1].asset.width"
          [height]="responsiveGallery[1].asset.height"-->
          <img class="absolute inset-0 h-[400px] max-h-[400px] lg:max-h-full lg:h-[120vh] object-cover"
               [ngSrc]="responsiveGallery[1].asset.filePath"
               [alt]="responsiveGallery[1].asset.alt"
               [width]="responsiveGallery[1].asset.width"
               [height]="responsiveGallery[1].asset.height"
               [priority]="true"
               [ngSrcset]="responsiveGallery[1].attributes.breakpoints.ngSrcSet.asString"
               [sizes]="responsiveGallery[1].attributes.sizes.asString">
          <div class="absolute inset-0">
            <div class="flex flex-col m-[10%] h-4/5 w-4/5 items-center justify-center">
              <h2 class="text-4xl text-center text-button-header-white text-nowrap">NEW ARRIVALS</h2>
              <button
                class="font-bold text-button-header-white flex flex-col w-fit after:h-[2px] after:block after:bg-button-header-white after:w-full py-2"
              >SHOP
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContentComponent {
  protected responsiveGallery: ResponsiveImage[];

  constructor(responsiveImageService: ResponsiveImageService) {
    this.responsiveGallery = this.images.map(item => responsiveImageService.convertGalleryItemToImageAsset(item, item.height));
  }

  readonly images: GalleryItem[] = [
    /*{ url: "https://i.ibb.co/tzZY97P/66eb64bc7409.jpg", width: 180, height: 270 },
    { url: "https://i.ibb.co/VTXvGQD/dc5b721664c0.jpg", width: 360, height: 540 },
    { url: "https://i.ibb.co/V3ZjqVf/bf5303e7c6a4.jpg", width: 540, height: 810 },
    { url: "https://i.ibb.co/G9C9BCt/fdb37a525505.jpg", width: 720, height: 1080 },
    { url: "https://i.ibb.co/GcF4kdJ/47d5e272032c.jpg", width: 900, height: 1350 },
    { url: "https://i.ibb.co/4Vb0b7s/c3cbc58e7332.jpg", width: 1080, height: 1621 },
    { url: "https://i.ibb.co/593n1jY/e18881075bab.jpg", width: 1296, height: 1945 },
    { url: "https://i.ibb.co/Vgt8Q5Y/57e09c04df1a.jpg", width: 1512, height: 2269 },
    { url: "https://i.ibb.co/8Y36Pd7/e73d6f23443e.jpg", width: 1728, height: 2593 },*/
    { id: 1, image: "https://i.ibb.co/1b41Kyj/DSCF4877.jpg", width: 4160, height: 6240 },
    { id: 2, image: "https://i.ibb.co/vmsMYrW/DSCF5636.jpg", width: 4160, height: 6240 },
  ];
}
