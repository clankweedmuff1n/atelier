import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-section-link',
  standalone: true,
  imports: [],
  template: `
    <a class="uppercase border-b border-color-black" [href]="link">
      <ng-content/>
    </a>
  `,
})
export class SectionLinkComponent {
  @Input({required: true}) link!: string;
}
