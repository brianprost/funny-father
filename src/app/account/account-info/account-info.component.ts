import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-info',
  template: `
    <div class="flex h-screen justify-center items-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <app-avatar></app-avatar>
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ accountInfo.name }}</h2>
          <input
            type="email"
            placeholder="{{ accountInfo.email }}"
            class="input input-bordered w-full max-w-xs"
          />
          <input
            type="tel"
            placeholder="{{ accountInfo.phone }}"
            class="input input-bordered w-full max-w-xs"
          />
          <input
            type="password"
            placeholder="*************"
            class="input input-bordered w-full max-w-xs"
          />
          <div class="card-actions">
            <button class="btn btn-primary">Update account</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AccountInfoComponent implements OnInit {
  accountInfo = {
    name: 'Chris R',
    email: 'chris_r@WhatKindOfMoney.com',
    phone: '555-555-5555',
  };

  constructor() {}

  ngOnInit(): void {}
}
