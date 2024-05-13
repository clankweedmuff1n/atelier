import {Component} from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {DiscountElementComponent} from "../../utilities/discount-element/discount-element.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {AuthState, Login} from "../../store/auth/state/Auth.state";
import {AuthenticationRequest} from "../../models/AuthenticationRequest";
import {CustomModalComponent} from "../../components/custom-modal/custom-modal.component";
import {User} from "../../models/User";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    DiscountElementComponent,
    ReactiveFormsModule,
    CustomModalComponent
  ],
  template: `
    <div class="h-[100vh] flex flex-col justify-between">
      <app-header/>
      <section>
        <form class="px-5 lg:px-0 max-w-[500px] items-center py-14 m-auto flex flex-col justify-between"
              [formGroup]="loginForm" (ngSubmit)="submit()">
          <h2 class="text-2xl uppercase my-6 text-center">Login</h2>
          <input required class="w-full mb-5 h-9 pl-4 outline-0 border border-color-gray" placeholder="Email" id="email"
                 type="text" formControlName="email">
          <input required class="w-full mb-3 lg:mb-5 h-9 pl-4 outline-0 border border-color-gray" placeholder="Password"
                 id="password"
                 type="text" formControlName="password">
          <h2 class="text-red-700 mb-3 lg:mb-5">{{ this.error?.message }}</h2>
          <button (click)="this.router.navigateByUrl('profile/reset-password', {state: {returnUrl: this.returnUrl}})"
                  class="text-sm lg:text-xs text-button-header-black">Forgot your password?
          </button>
          <button
            type="submit"
            class="uppercase py-[16px] w-full bg-button-header-black text-button-header-white rounded-md font-medium my-5 lg:my-10">
            Sign in
          </button>
          <button (click)="this.router.navigateByUrl('profile/registration', {state: {returnUrl: this.returnUrl}})"
                  class="text-sm lg:text-xs text-button-header-black my-3">
            Create account
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
      <app-discount-element/>
      <app-footer/>
    </div>
  `,
})
export class LoginPageComponent {
  loginForm: FormGroup;
  fields: {
    email: FormControl,
    password: FormControl
  };
  isLoading = false;
  error: Error | undefined = undefined;

  returnUrl: string;

  onModalOpen() {
    this.isLoading = true
  }

  onModalClose() {
    this.isLoading = false;
  }

  submit() {
    if (this.loginForm.valid) {
      this.onModalOpen();
      this.store.dispatch(new Login(this.loginForm.value as AuthenticationRequest)).subscribe({
        next: () => {
          const user: User | null = this.store.selectSnapshot(AuthState.user);
          console.log(user)
          !!user && !user.confirmed ? this.router.navigateByUrl("/profile/verification", {state: {returnUrl: this.returnUrl}}) : this.router.navigateByUrl(this.returnUrl);
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

  constructor(protected router: Router, private store: Store, private formBuilder: FormBuilder) {
    const state = this.router.getCurrentNavigation()?.extras.state as { returnUrl: string };
    this.returnUrl = state?.returnUrl || '/';
    this.fields = {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    }
    this.loginForm = this.formBuilder.group(this.fields);
  }
}
