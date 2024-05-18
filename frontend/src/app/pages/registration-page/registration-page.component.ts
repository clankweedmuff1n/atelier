import { Component } from '@angular/core';
import {DiscountElementComponent} from "../../utilities/discount-element/discount-element.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {HeaderComponent} from "../../components/header/header.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthState, Register} from "../../store/auth/state/Auth.state";
import {Store} from "@ngxs/store";
import {RegistrationRequest} from "../../models/RegistrationRequest";
import {CustomModalComponent} from "../../components/custom-modal/custom-modal.component";
import {User} from "../../models/User";

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    DiscountElementComponent,
    FooterComponent,
    HeaderComponent,
    ReactiveFormsModule,
    CustomModalComponent
  ],
  template: `
    <div class="h-[100vh] flex flex-col justify-between">

      <app-header/>
      <section>
        <form class="px-5 lg:px-0 max-w-[500px] items-center py-14 m-auto flex flex-col justify-between"
              [formGroup]="registrationForm" (ngSubmit)="submit()">
          <h2 class="text-2xl uppercase my-6 text-center">Create account</h2>
          <input class="w-full mb-5 h-9 pl-4 outline-0 border border-color-gray" placeholder="First name"
                 id="first_name"
                 type="text" formControlName="first_name">
          <input class="w-full mb-5 h-9 pl-4 outline-0 border border-color-gray" placeholder="Last name" id="last_name"
                 type="text" formControlName="last_name">
          <input class="w-full mb-5 h-9 pl-4 outline-0 border border-color-gray" placeholder="Email" id="email"
                 type="text" formControlName="email">
          <input class="w-full mb-3 lg:mb-5 h-9 pl-4 outline-0 border border-color-gray" placeholder="Password"
                 id="password"
                 type="text" formControlName="password">
          <h2 class="text-red-700">{{ this.error?.message }}</h2>
          <button
            type="submit"
            class="uppercase py-[16px] w-full bg-button-header-black text-button-header-white rounded-md font-medium my-3 lg:my-10">
            Create account
          </button>
          <button (click)="this.router.navigateByUrl('profile/login', {state: {returnUrl: this.returnUrl}})"
                  class="text-sm lg:text-xs text-button-header-black my-3">Return
            to login
          </button>
          <button class="text-sm lg:text-xs text-button-header-black mb-3">Return to store</button>
        </form>
        <app-custom-modal
          [isVisible]="isLoading"
          [escapable]="false"
          (openModalEvent)="onModalOpen()"
          (closeModalEvent)="onModalClose()">
          <div class="absolute w-full h-full flex justify-center items-center">
            <svg class="w-48 h-48" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                 y="0px"
                 viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
    <path fill="#fff"
          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        dur="1s"
        from="0 50 50"
        to="360 50 50"
        repeatCount="indefinite"/>
  </path>
</svg>
          </div>
        </app-custom-modal>
      </section>
      <app-discount-element class="w-full"/>
      <app-footer/>
    </div>
  `,
})
export class RegistrationPageComponent {
  registrationForm: FormGroup;
  fields: {
    first_name: FormControl,
    last_name: FormControl,
    email: FormControl,
    password: FormControl
  };

  returnUrl: string;

  isLoading = false;
  error: Error | undefined = undefined;

  constructor(protected router: Router, private formBuilder: FormBuilder, private store: Store) {
    const state = this.router.getCurrentNavigation()?.extras.state as { returnUrl: string };
    this.returnUrl = state?.returnUrl || '/';
    this.fields = {
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    }
    this.registrationForm = this.formBuilder.group(this.fields);
  }

  onModalOpen() {
    this.isLoading = true
  }

  onModalClose() {
    this.isLoading = false;
  }

  resetForm() {
    this.registrationForm.reset();
  }

  submit() {
    if (this.registrationForm.valid) {
      this.onModalOpen();
      this.store.dispatch(new Register(this.registrationForm.value as RegistrationRequest)).subscribe({
        next: () => {
          const user: User | null = this.store.selectSnapshot(AuthState.user);
          user && !user.confirmed ? this.router.navigateByUrl("/profile/verification", {state: {returnUrl: this.returnUrl}}) : this.router.navigateByUrl(this.returnUrl);
        },
        error: (err) => {
          this.error = err;
          this.onModalClose();
        },
        complete: () => {
          this.error = undefined;
          this.onModalClose();
        }
      });
    } else {
      if (!this.fields.email.valid) this.error = new Error("Ошибка, введите правильный email");
      else this.error = new Error("Ошибка, заполните все поля");
    }
  }
}
