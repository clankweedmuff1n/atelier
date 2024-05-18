import { Component } from '@angular/core';

@Component({
  selector: 'header-button',
  standalone: true,
  imports: [],
  template: `
    <button
      class="inline-block after:w-0 after:h-[2px] after:block after:bg-button-header-black after:transition-all hover:after:w-full  data-[state=active]:after:w-full text-lg py-2"
    >
      <ng-content/>
    </button>

  `,
})
export class HeaderButtonComponent {

}
