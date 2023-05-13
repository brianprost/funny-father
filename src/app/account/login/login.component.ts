import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, from, switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  template: `
    <div class="container mx-auto flex justify-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <app-avatar></app-avatar>
        </figure>
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
              <!-- login button -->
              <button class="btn btn-primary" [disabled]="loginForm.invalid">Login</button>
            </div>
        </form>
        </div>
      </div>

  `,
  styles: [],
})
export class LoginComponent {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private formBuilder: FormBuilder = inject(FormBuilder);
  loginForm = this.formBuilder.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(8)],
  });

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value as {
      email: string;
      password: string;
    };

    from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        switchMap(() => this.router.navigate(['/'])),
        catchError((error) => {
          console.error('Login failed:', error);
          return [];
        })
      )
      .subscribe();
  }
}
