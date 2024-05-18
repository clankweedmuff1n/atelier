import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-look-book',
  standalone: true,
  imports: [
    NgForOf
  ],
  template: `
    <section class="px-10 lg:px-20 py-12 flex flex-col">
      <h3 class="uppercase w-full font-bold text-left mb-4">Look book</h3>
      <div class="flex justify-center flex-col lg:flex-row gap-8">
        <div *ngFor="let card of cards">
          <img class="object-center hover:translate-x-[-15px] duration-700 transition-all" [src]="card.img" [alt]="card.title"/>
          <h3 class="text-left underline-offset-4 font-medium underline">{{card.title}}</h3>
        </div>
      </div>
    </section>
  `,
})
export class LookBookComponent {
  readonly cards = [
    {
      img: "https://i.ibb.co/m82zffZ/DSCF4674.jpg",
      title: "SPRING/SUMMER 2024",
    },
    {
      img: "https://i.ibb.co/4grPfRx/DSCF4912.jpg",
      title: "CRUISE/RESORT 2024",
    },{
      img: "https://i.ibb.co/kcD9vpz/DSCF5386.jpg",
      title: "AUTUMN/WINTER 2023",
    },
  ]
}
