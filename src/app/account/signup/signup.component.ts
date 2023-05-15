import { Component, OnInit, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  template: `
    <div class="container mx-auto flex justify-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img src="assets/img/nav-logo.jpg" alt="logo" class="logo h-20 rounded-lg" />
        </figure>
        <div class="card-body">
          <h2 class="card-title justify-center text-2xl mb-2">Sign Up</h2>
          <form
            [formGroup]="signUpForm"
            (ngSubmit)="signUpWithEmailAndPassword()"
          >
            <input
              type="email"
              placeholder="email"
              class="input input-bordered w-full max-w-xs mb-4"
              formControlName="email"
            />
            <input
              type="password"
              placeholder="password"
              class="input input-bordered w-full max-w-xs mb-4"
              formControlName="password"
            />
            <div class="card-actions justify-end">
              <button class="btn btn-primary" [disabled]="signUpForm.invalid">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SignupComponent {
  private auth = inject(Auth);

  private formBuilder: FormBuilder = inject(FormBuilder);
  signUpForm: FormGroup;

  constructor() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(8)],
    });
  }

  signUpWithEmailAndPassword() {
    const { email, password } = this.signUpForm.value;
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
}
