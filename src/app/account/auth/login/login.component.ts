import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';

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
          <!-- TODO: make this a tab -->
          <p class="text-base-content text-opacity-50 mt-4">
            Not on the list? <a href="/account/signup" class="link">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {

  constructor() {}
  ngOnInit(): void {}

  login() {
    console.log('login');
  }
}
