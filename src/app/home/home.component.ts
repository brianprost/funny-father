import { Component, OnInit } from '@angular/core';
import IJoke from '../types/IJoke';

@Component({
  selector: 'app-home',
  template: `
    <section id="home" class="hero min-h-[calc(100vh-180px)] bg-primary">
      <div class="hero-content text-center text-neutral drop-shadow-sm">
        <div class="max-w-md">
          <app-joke [joke]="joke" *ngIf="joke"></app-joke>
          <button class="btn btn-neutral" (click)="getNewJoke()">
            Get another joke
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  joke: IJoke = {
    setup: 'welcome to',
    punchline: 'Funny Father',
  };

  constructor() {}

  ngOnInit() {}

  getNewJoke() {
    this.joke = {
      setup: 'this is a setup',
      punchline: 'this is a punchline',
    };
  }
}
