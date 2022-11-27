import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jokes',
  template: `
    <h1 class="text-4xl">Jokes</h1>
    <app-joke-list></app-joke-list>
    <!-- <router-outlet></router-outlet> -->
  `,
  styles: [],
})
export class JokesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
