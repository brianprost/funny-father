import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  template: `
    <div class="container mx-auto flex justify-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body items-center text-center">
          <h2 class="card-title">Sign up</h2>
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
          <input
            type="date"
            placeholder="birthdate"
            class="input input-bordered w-full max-w-xs"
          />
          <div class="card-actions">
            <button class="btn btn-primary">Sign up</button>
          </div>
          <!-- TODO: make this a tab -->
          <p class="text-base-content text-opacity-50 mt-4">
            Have we met before? <a href="/account/login" class="link">Login</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SignupComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
