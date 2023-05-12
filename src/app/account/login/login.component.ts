import { Component, OnInit, Optional, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  template: `
    <div class="container mx-auto flex justify-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <app-avatar></app-avatar>
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">Login</h2>
          <input
            type="email"
            placeholder="email"
            class="input input-bordered w-full max-w-xs"
          />
          <input
            type="password"
            placeholder="password"
            class="input input-bordered w-full max-w-xs"
          />
          <div class="card-actions">
            <button class="btn btn-primary" (click)="login()">Login</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent {
  private auth: Auth = inject(Auth);

  login() {
    // do login with username and password
    signInWithEmailAndPassword(this.auth, 'brian.s.prost+alphaOne@gmail.com', 'RBV0qnd5drq@fzr@aec')
  }
}
