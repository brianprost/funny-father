import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import IJoke from '../types/IJoke';

@Component({
  selector: 'app-home',
  template: `
    <section id="home" class="hero min-h-screen bg-base-200">
      <!-- display if content is not loaded yet -->
      <ng-container *ngIf="">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-slate-700 h-10 w-10"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-slate-700 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                <div class="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </ng-container>
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">{{ (joke | async)?.setup }}</h1>
          <p class="py-6 text-3xl">
            {{ (joke | async)?.punchline }}
          </p>
          <button class="btn btn-primary" (click)="getNewJoke()">
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
