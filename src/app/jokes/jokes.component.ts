import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jokes',
  template: `
    <div class="bg-primary">
      <h1 class="text-5xl text-center my-8">My Saved Jokes</h1>
      <app-joke-list></app-joke-list>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class JokesComponent {}
