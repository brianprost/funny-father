import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, from, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="container mx-auto flex justify-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <app-avatar></app-avatar>
        </figure>
        <div class="card-body">
          <h2 class="card-title">Login</h2>
          <form [formGroup]="loginForm" (ngSubmit)="login()">
            <input
              type="email"
              placeholder="email"
              class="input input-bordered w-full max-w-xs"
              formControlName="email"
            />
            <input
              type="password"
              placeholder="password"
              class="input input-bordered w-full max-w-xs"
              formControlName="password"
            />
            <div class="card-actions">
              <button class="btn btn-primary" [disabled]="loginForm.invalid">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent {
  private authService = inject(AuthService)
  private router: Router = inject(Router);
  private formBuilder: FormBuilder = inject(FormBuilder);
  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value as {
      email: string;
      password: string;
    };

    this.authService.login(email, password);
  }
}
