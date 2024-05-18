import {Component, ViewChild} from '@angular/core';
import {CustomModalComponent} from "../../components/custom-modal/custom-modal.component";
import {DiscountElementComponent} from "../../utilities/discount-element/discount-element.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {HeaderComponent} from "../../components/header/header.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {InputOTPComponent} from "../../utilities/input-otp/input-otp.component";
import {AuthState, ConfirmAccount, Register} from "../../store/auth/state/Auth.state";
import {RegistrationRequest} from "../../models/RegistrationRequest";
import {User} from "../../models/User";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-verification-page',
  standalone: true,
  imports: [
    CustomModalComponent,
    DiscountElementComponent,
    FooterComponent,
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    NgClass,
    NgIf,
    InputOTPComponent
  ],
  template: `
    <div class="h-[100vh] flex flex-col justify-between">
      <app-header/>
      <section>
        <form class="px-5 lg:px-0 max-w-[500px] items-center py-14 m-auto flex flex-col justify-between">
          <h2 class="text-2xl uppercase my-6 text-center">Verification Code</h2>
          <div class="flex flex-col gap-4">
            <app-input-otp class="py-20" #otpInput [inputSize]="6"
                           (formValidityChange)="onFormValidityChange($event)"
                           (otpChange)="onOTPChange($event)"
                           (formReset)="onFormReset()"/>
          </div>
        </form>
        <app-custom-modal
          [isVisible]="isLoading"
          [escapable]="false"
          (openModalEvent)="onModalOpen()"
          (closeModalEvent)="onModalClose()">
          <div class="absolute w-full h-full flex justify-center items-center">
            <svg class="w-48 h-48" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg"
                 x="0px"
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
export class VerificationPageComponent {
  @ViewChild('otpInput') otpInput!: InputOTPComponent;

  returnUrl: string;

  constructor(protected router: Router, private store: Store) {
    const state = this.router.getCurrentNavigation()?.extras.state as { returnUrl: string };
    this.returnUrl = state?.returnUrl || '/profile';
  }

  submit() {
    if (this.checkFormValidity()) {
      this.onModalOpen();
      this.store.dispatch(new ConfirmAccount({code: this.getOTP()})).subscribe({
        next: () => {
          const user: User | null = this.store.selectSnapshot(AuthState.user);
          if (user && user.confirmed) this.router.navigateByUrl(this.returnUrl);
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
      this.error = new Error("Ошибка, заполните все поля");
    }
  }

  isLoading = false;
  error: Error | undefined = undefined;

  onModalOpen() {
    this.isLoading = true
  }

  onModalClose() {
    this.isLoading = false;
  }

  onFormValidityChange(validity: boolean): void {
    console.log('Form validity changed:', validity);
  }

  onOTPChange(otp: string): void {
    if (this.checkFormValidity() && otp.length === 6) {
      this.submit();
    } else {
      this.error = new Error("Ошибка, заполните все поля");
    }
  }

  onFormReset(): void {
    console.log('Form reset');
  }

  checkFormValidity(): boolean {
    return this.otpInput.verificationForm.valid;
  }

  getOTP(): string {
    return  this.otpInput.verificationForm.value.code;
  }

  resetForm(): void {
    this.otpInput.verificationForm.reset();
  }
}
