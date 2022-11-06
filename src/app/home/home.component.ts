import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import IJoke from '../types/IJoke';

@Component({
  selector: 'app-home',
  template: `
    <section id="home" class="hero min-h-[calc(100vh-180px)] bg-primary">
      <div class="hero-content text-center text-neutral drop-shadow-sm">
        <div class="max-w-md">
          <app-setup [setup]="(joke | async)?.setup"></app-setup>
          <app-punchline
            [punchline]="(joke | async)?.punchline"
          ></app-punchline>
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
    this.getFirebaseJoke();
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
    this.getFirebaseJoke();
  }

  getFirebaseJoke() {
    this.joke = this.db
      .object(`jokes/${this.getRandomNumber()}`)
      .valueChanges() as Observable<IJoke>;
  }
}
