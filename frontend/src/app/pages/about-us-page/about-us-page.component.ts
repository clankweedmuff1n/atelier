import {Component} from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";
import {HeaderComponent} from "../../components/header/header.component";
import {DiscountElementComponent} from "../../utilities/discount-element/discount-element.component";
import {NgOptimizedImage} from "@angular/common";
import {ResponsiveImage} from "../../utilities/images/responsive-image";
import {ResponsiveImageService} from "../../utilities/images/responsive-image.service";
import {GalleryItem} from "../../models/GalleryItem";
import {SectionLinkComponent} from "../../utilities/section-link/section-link.component";

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    DiscountElementComponent,
    NgOptimizedImage,
    SectionLinkComponent
  ],
  template: `
    <app-header/>
    <section class="w-full flex lg:flex-row flex-col-reverse items-start justify-center pb-8">
      <div class="flex flex-col gap-6 w-full lg:w-1/2 py-12 px-5 lg:p-16 h-full">
        <h2 class="uppercase">О нас</h2>
        <p>Мы предлагаем Вашему вниманию одежду, которую создаём командой профессионалов. В основе наших коллекций
          натуральные ткани от ведущих мировых производителей, лекала с хорошей посадкой и актуальные современные
          тенденции. Ассортимент сочетает роскошь и стиль, включает в себя как базовые вещи, так и эксклюзивные модели,
          способные удовлетворить любой стиль и потребность. При создании наших коллекций мы учитываем не только модные
          тенденции, но и практичность, удобство и долговечность. Не сомневайтесь, вложение в нашу роскошную и
          качественную одежду будет полностью оправдано. Вы заслуживаете только лучшее, и мы предлагаем вам это.</p>
        <p>Лекала мы создаём сами, основываясь на 15 летнем опыте в индивидуальном пошиве. Все лекала вымерены. Перед
          массовым производством мы разрабатываем и пробуем в носки несколько вариантов лекал, в поисках идеальной
          посадки и удобства.</p>
        <p>Мы создаём и предлагаем Вам только качественные товары. <br/>Большое внимание уделяется деталям. Начиная от
          разработки удобных лекал и тщательно подобранной фурнитуры, заканчивая каждым проверенным швом.</p>
        <p>Наша миссия-создать одежду, которая сочетает в себе роскошь и стиль, удобство и комфортность, раскрывает Вашу
          индивидуальность./p>
        <p>Мы предлагаем вам возможность выбора цвета ткани и пошив по Вашим индивидуальным меркам. Любой костюм Вы
          можете собрать, например, верх-Ѕ, низ-М. Также у Вас есть возможность отправить нам замеры и мы скорректируем
          лекала под Вашу фигуру.</p>
        <p>Это индивидуальный пошив! Только с готовой идеей, вымеренными лекалами и оптимальной ценой.</p>
        <div class="pt-8 font-medium flex w-full justify-center items-center">
          <app-section-link link="/shop">Магазин</app-section-link>
        </div>
      </div>
      <div class="w-full lg:w-1/2">
        <img class="w-full h-full object-cover"
             [ngSrc]="responsiveGallery[0].asset.filePath"
             [alt]="responsiveGallery[0].asset.alt"
             [width]="responsiveGallery[0].asset.width"
             [height]="responsiveGallery[0].asset.height"
             [priority]="true"
             [ngSrcset]="responsiveGallery[0].attributes.breakpoints.ngSrcSet.asString"
             [sizes]="responsiveGallery[0].attributes.sizes.asString"/>
      </div>
      <!--<div class="flex flex-col w-full justify-center lg:flex-row gap-5">
        <img class="min-h-0 w-[45%]"
             [ngSrc]="responsiveGallery[0].asset.filePath"
             [alt]="responsiveGallery[0].asset.alt"
             [width]="responsiveGallery[0].asset.width"
             [height]="responsiveGallery[0].asset.height"
             [priority]="true"
             [ngSrcset]="responsiveGallery[0].attributes.breakpoints.ngSrcSet.asString"
             [sizes]="responsiveGallery[0].attributes.sizes.asString"/>
        <img class="min-h-0 w-[45%]"
             [ngSrc]="responsiveGallery[1].asset.filePath"
             [alt]="responsiveGallery[1].asset.alt"
             [width]="responsiveGallery[1].asset.width"
             [height]="responsiveGallery[1].asset.height"
             [priority]="true"
             [ngSrcset]="responsiveGallery[1].attributes.breakpoints.ngSrcSet.asString"
             [sizes]="responsiveGallery[1].attributes.sizes.asString"/>
      </div>
      <div class="flex flex-col w-full justify-center lg:flex-row gap-5">
        <img class="min-h-0 w-[45%]"
             [ngSrc]="responsiveGallery[2].asset.filePath"
             [alt]="responsiveGallery[2].asset.alt"
             [width]="responsiveGallery[2].asset.width"
             [height]="responsiveGallery[2].asset.height"
             [priority]="true"
             [ngSrcset]="responsiveGallery[2].attributes.breakpoints.ngSrcSet.asString"
             [sizes]="responsiveGallery[2].attributes.sizes.asString"/>
        <img class="min-h-0 w-[45%]"
             [ngSrc]="responsiveGallery[3].asset.filePath"
             [alt]="responsiveGallery[3].asset.alt"
             [width]="responsiveGallery[3].asset.width"
             [height]="responsiveGallery[3].asset.height"
             [priority]="true"
             [ngSrcset]="responsiveGallery[3].attributes.breakpoints.ngSrcSet.asString"
             [sizes]="responsiveGallery[3].attributes.sizes.asString"/>
      </div>-->
    </section>
    <app-discount-element/>
    <app-footer/>
  `,
})
export class AboutUsPageComponent {
  protected responsiveGallery: ResponsiveImage[];

  constructor(responsiveImageService: ResponsiveImageService) {
    this.responsiveGallery = this.images.map(item => responsiveImageService.convertGalleryItemToImageAsset(item, item.height));
  }

  readonly images: GalleryItem[] = [
    {id: 1, image: "https://i.ibb.co/vZKzvWJ/IMG-7132.jpg", width: 960, height: 1280},
    /*{ id: 1, image: "https://i.postimg.cc/HknPLxx3/image.png", width: 453, height: 800 },
    { id: 2, image: "https://i.postimg.cc/Hxw6N8ZW/image.png", width: 453, height: 800 },
    { id: 3, image: "https://i.postimg.cc/mkTmWZJY/image.png", width: 453, height: 800 },
    { id: 4, image: "https://i.postimg.cc/gkJKV7W2/image.png", width: 453, height: 800 },*/
  ];
}
