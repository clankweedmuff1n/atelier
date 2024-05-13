import { Component } from '@angular/core';
import {BgsetDirective, ImageSource} from "../../bgset-directive.directive";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    BgsetDirective,
  ],
  template: `
    <section class="">

      <div class="flex flex-col lg:flex-row gap-1">
        <div
          class="w-full lg:w-1/2 h-[400px] max-h-[400px] lg:max-h-full lg:h-[120vh] relative bg-no-repeat bg-cover bg-center"
          [appBgset]="images" [maxWidth]="2000" [maxHeight]="3001">
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
          class="w-full lg:w-1/2 h-[400px] max-h-[400px] lg:max-h-full lg:h-[120vh] relative bg-no-repeat bg-cover bg-center"
          style="background-image: url('https://i.ibb.co/vmsMYrW/DSCF5636.jpg')">
          <!--style="background-image: url('https://thelinebyk.com/cdn/shop/files/MOBILE-EDIT-2_900x.jpg?v=1712696066')">-->
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
  readonly images: ImageSource[] = [
    /*{ url: "https://i.ibb.co/tzZY97P/66eb64bc7409.jpg", width: 180, height: 270 },
    { url: "https://i.ibb.co/VTXvGQD/dc5b721664c0.jpg", width: 360, height: 540 },
    { url: "https://i.ibb.co/V3ZjqVf/bf5303e7c6a4.jpg", width: 540, height: 810 },
    { url: "https://i.ibb.co/G9C9BCt/fdb37a525505.jpg", width: 720, height: 1080 },
    { url: "https://i.ibb.co/GcF4kdJ/47d5e272032c.jpg", width: 900, height: 1350 },
    { url: "https://i.ibb.co/4Vb0b7s/c3cbc58e7332.jpg", width: 1080, height: 1621 },
    { url: "https://i.ibb.co/593n1jY/e18881075bab.jpg", width: 1296, height: 1945 },
    { url: "https://i.ibb.co/Vgt8Q5Y/57e09c04df1a.jpg", width: 1512, height: 2269 },
    { url: "https://i.ibb.co/8Y36Pd7/e73d6f23443e.jpg", width: 1728, height: 2593 },*/
    { url: "https://i.ibb.co/BsqhRq5/8eb225d25c13.jpg", width: 1950, height: 2926 },
    { url: "https://i.ibb.co/kyg06pz/b433bbd3413f.jpg", width: 2000, height: 3001 },
  ]
}
