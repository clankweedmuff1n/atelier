import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {fromEvent, Subscription} from "rxjs";
import {
  openCloseModal,
  openCloseModalBackground
} from "../../animations/modal/modal.animations";

@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  animations: [openCloseModalBackground, openCloseModal],
  template: `
    <div *ngIf="isVisible"
         aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div
        (click)="closeModal()" (keydown.escape)="closeModal()" tabindex="0"
        [@openCloseModalBackground]="animateState"
        class="fixed z-50 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="absolute z-[60] h-[100vh] inset-0 w-full">
        <ng-content/>
      </div>
    </div>
  `,
})
export class CustomModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() escapable: boolean = true;
  @Input() className: string = "";
  pressEscToClose: Subscription = new Subscription();
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() openModalEvent = new EventEmitter<void>();

  animateState = 'show';

  ngOnInit() {
    if (this.escapable) {
      this.pressEscToClose.add(
        fromEvent<KeyboardEvent>(window, 'keydown').subscribe((event) => {
          if (event.code === 'Escape') {
            this.closeModal();
          }
        })
      );
    }
  }

  hide() {
    this.animateState = 'hide';
  }

  show() {
    this.animateState = 'show';
  }

  closeModal() {
    this.hide();
    setTimeout(() => {
      this.isVisible = false;
      this.closeModalEvent.emit();
      this.show();
    }, 300);
  }

  openModal() {
    this.show();
    this.isVisible = true;
    this.openModalEvent.emit();
  }
}
