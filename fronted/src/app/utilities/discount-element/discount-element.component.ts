import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-discount-element',
  standalone: true,
  imports: [],
  template: `
    <div class="px-5 max-w-[450px] min-h-[200px] w-full flex flex-col items-center m-auto justify-center">
      <h2 class="pt-2.5 text-sm">
        {{ title }}
      </h2>
      <p class="text-sm py-2.5">
        {{ description }}
      </p>
      <div class="flex w-full">
        <input
          [placeholder]="placeholder"
          class="w-full h-9 pl-4 outline-0 border border-color-gray"
        >
        <button class="uppercase text-sm px-2.5 text-button-header-white bg-button-header-black font-medium">{{ buttonText }}</button>
      </div>
    </div>
  `,
})
export class DiscountElementComponent {
  @Input() title: string = "10% off your first order";
  @Input() description: string = "Sign up for new arrivals, markdowns, and more";
  @Input() buttonText: string = "Subscribe";
  @Input() placeholder: string = "Email";
}
