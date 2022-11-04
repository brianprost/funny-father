import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import IJoke from '../types/IJoke';

@Component({
  selector: 'app-home',
  template: `
    <section id="home" class="hero min-h-[calc(100vh-133px)] bg-primary">
      <div class="hero-content text-center text-neutral drop-shadow-sm">
        <div class="max-w-md">
          <h1 class="text-5xl xs:text-7xl font-bold">
            {{ (joke | async)?.setup }}
          </h1>
          <p class="py-6 text-4xl xs:text-5xl">
            {{ (joke | async)?.punchline }}
          </p>
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
  joke: Observable<IJoke> | undefined;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    // get joke from firebase
    console.log(`innit`);

    this.joke = this.db
      .object(`jokes/${this.getRandomNumber()}`)
      .valueChanges() as Observable<IJoke>;
  }

  // get random number between 0 and max count of jokes
  getRandomNumber(): number {
    return Math.floor(Math.random() * 24);
  }

  getLengthOfJokeList() {
    // get length of joke list from firebase
    // return length
  }

  getNewJoke() {
    // TODO this is bad because it just refreshes the page
    window.location.reload();
  }
}
