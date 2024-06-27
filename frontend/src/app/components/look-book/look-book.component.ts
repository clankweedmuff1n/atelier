import { Component } from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ResponsiveImage} from "../../utilities/images/responsive-image";
import {ResponsiveImageService} from "../../utilities/images/responsive-image.service";

@Component({
  selector: 'app-look-book',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  template: `
    <section class="px-10 lg:px-20 py-12 flex flex-col">
      <h3 class="uppercase w-full font-bold text-left mb-4">Look book</h3>
      <div class="flex justify-center flex-col lg:flex-row gap-8">
        <div *ngFor="let card of cards; let i = index">
          <img class="object-center hover:translate-x-[-15px] duration-700 transition-all"
               [ngSrc]="responsiveGallery[i].asset.filePath"
               [alt]="responsiveGallery[i].asset.alt"
               [width]="responsiveGallery[i].asset.width"
               [height]="responsiveGallery[i].asset.height"
               [priority]="false"
               [ngSrcset]="responsiveGallery[i].attributes.breakpoints.ngSrcSet.asString"
               [sizes]="responsiveGallery[i].attributes.sizes.asString"/>
          <h3 class="text-left underline-offset-4 font-medium underline">{{card.title}}</h3>
        </div>
      </div>
    </section>
  `,
})
export class LookBookComponent {
  protected responsiveGallery: ResponsiveImage[];

  constructor(responsiveImageService: ResponsiveImageService) {
    this.responsiveGallery = this.cards.map(item => responsiveImageService.convertGalleryItemToImageAsset(item.img, item.img.height));
  }

  readonly cards = [
    {
      img: {
        id: 1,
        image: "https://i.ibb.co/m82zffZ/DSCF4674.jpg",
        width: 4160,
        height: 6240,
      },
      title: "SPRING/SUMMER 2024",
    },
    {
      img: {
        id: 1,
        image: "https://i.ibb.co/4grPfRx/DSCF4912.jpg",
        width: 4160,
        height: 6240,
      },
      title: "CRUISE/RESORT 2024",
    },{
      img: {
        id: 1,
        image: "https://i.ibb.co/kcD9vpz/DSCF5386.jpg",
        width: 4160,
        height: 6240,
      },
      title: "AUTUMN/WINTER 2023",
    },
  ]
}
