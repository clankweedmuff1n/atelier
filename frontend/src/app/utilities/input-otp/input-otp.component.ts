import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-input-otp',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  template: `
    <form [formGroup]="verificationForm">
      <div
        class="relative cursor-text select-none pointer-events-none flex items-center gap-2 has-[:disabled]:opacity-50">
        <div class="flex items-center">
          <ng-container *ngFor="let index of otpArray; let i = index">
            <div
              [ngClass]="{
                  'border-black': isInputFocused && ((isSelectedAll && i < selectedSize) || (this.verificationForm.value.code.length === i) || (i + 1 === inputSize && this.verificationForm.value.code.length === inputSize)),

                  }"
              class="relative flex h-14 lg:h-20 w-14 lg:w-20 items-center justify-center border-y border-l-[calc(1px/2)] border-r-[calc(1px/2)] last:border-r first:border-l peer-hover:bg-black border-input text-sm lg:text-2xl transition-all first:rounded-l-md first:border-l last:rounded-r-md">
              <div
                [ngClass]="{
                  'animate-caret-blink': this.verificationForm.value.code.length === i,
                  }">
                {{ this.verificationForm.value.code.length === i ? this.isInputFocused ? "|" : "" : this.verificationForm.value.code.split("")[i] }}
              </div>
            </div>
            <div *ngIf="i == this.inputSize / 2 - 1" role="separator">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12.1" cy="12.1" r="1"></circle>
              </svg>
            </div>
          </ng-container>
        </div>
        <div class="select-none absolute inset-0 pointer-events-none"><input
          autocomplete="one-time-code"
          (focus)="isInputFocused = true"
          (blur)="onBlur()"
          formControlName="code"
          type="text"
          maxlength="6"
          value=""
          class="absolute inset-0 w-full h-full flex text-left opacity-0 text-transparent pointer-events-auto bg-transparent caret-transparent border-0 outline-none shadow-none  disabled:cursor-not-allowed select-none">
        </div>
      </div>
    </form>
  `,
})
export class InputOTPComponent implements OnDestroy {
  @ViewChildren('codeElement') codeElements!: QueryList<ElementRef>;
  verificationForm: FormGroup;
  private readonly formChangesSubscription: Subscription;

  @Input({required: false}) isInputFocused: boolean = false;
  protected isSelectedAll: boolean = false;
  protected selectedSize: number = 0;
  @Input({required: true}) inputSize!: number;

  @Output() formValidityChange = new EventEmitter<boolean>();
  @Output() otpChange = new EventEmitter<string>();
  @Output() formReset = new EventEmitter<void>();

  constructor(protected router: Router, private formBuilder: FormBuilder) {
    this.verificationForm = this.formBuilder.group({
      code: new FormControl('', [Validators.required, Validators.pattern("^\\d+$")]),
    });

    this.formChangesSubscription = this.verificationForm.valueChanges.subscribe(() => {
      if (this.verificationForm.value.code === null) this.verificationForm.value.code = "";
      this.otpChange.emit(this.verificationForm.value.code);
      this.isSelectedAll = false;
      this.selectedSize = 0;
      this.formValidityChange.emit(this.verificationForm.valid);
    });
  }

  @HostListener('document:selectionchange', ['$event'])
  onSelectionChange() {
    const selection = window.getSelection();
    console.log(selection)
    if (selection && selection.toString().trim() !== '') {
      if (this.verificationForm.value.code === selection.toString()) {
        this.isSelectedAll = true;
        this.selectedSize = this.verificationForm.value.code.length;
      } else {
        this.isSelectedAll = false;
        this.selectedSize = 0;
      }
    }
  }

  onBlur() {
    this.isInputFocused = false;
    this.isSelectedAll = false;
    this.selectedSize = 0;
  }

  ngOnDestroy(): void {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }

  get otpArray() {
    return new Array(this.inputSize);
  }

  protected readonly blur = blur;
}
