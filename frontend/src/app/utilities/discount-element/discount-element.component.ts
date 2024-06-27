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
      <p class="text-center text-sm py-2.5">
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
  @Input() title: string = "Получите скидку 10% на ваш первый заказ!";
  @Input() description: string = "Подпишитесь для того чтобы узнавать про новые поступления, скидки и многое другое!";
  @Input() buttonText: string = "Подписаться";
  @Input() placeholder: string = "E-mail";
}
