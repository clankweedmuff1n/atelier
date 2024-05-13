import { Component } from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";
import {HeaderComponent} from "../../components/header/header.component";
import {DiscountElementComponent} from "../../utilities/discount-element/discount-element.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    DiscountElementComponent,
    NgOptimizedImage
  ],
  template: `
    <app-header/>
    <section class="flex gap-5 flex-col items-center justify-center p-10">
        <img class="min-h-0 w-[45%]" src="https://i.ibb.co/y0jCFfB/IMG-6858.jpg"/>
      <div class="flex flex-col w-full justify-center lg:flex-row gap-5">
      <img class="min-h-0 w-[45%]" src="https://i.ibb.co/8dk8vmd/IMG-6859.jpg"/>
      </div>
      <div class="flex flex-col w-full justify-center lg:flex-row gap-5">
        <img class="min-h-0 w-[45%]" src="https://i.ibb.co/bRSxqsp/IMG-6860.jpg"/>
        <img class="min-h-0 w-[45%]" src="https://i.ibb.co/5W5S2Hd/IMG-6857.jpg"/>
      </div>
    </section>
    <app-discount-element/>
    <app-footer/>
  `,
})
export class AboutUsPageComponent {

}
