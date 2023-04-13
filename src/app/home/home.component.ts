import { Component, OnInit } from '@angular/core';
import IJoke from '../types/IJoke';
import { Observable, map } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  template: `
    <section id="home" class="hero min-h-[calc(100vh-180px)] bg-primary">
      <div class="hero-content text-center text-neutral drop-shadow-sm">
        <div class="max-w-md">
          <ng-container *ngIf="joke$ | async as joke">
            <app-joke [joke]="joke"></app-joke>
          </ng-container>
          <br />
          <button class="btn btn-neutral" (click)="getNewJoke()">
            Get another joke
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class HomeComponent {
  joke$!: Observable<IJoke>;
  jokesFromFirestore$!: any;

  constructor(private readonly firestore: Firestore) {
    this.getNewJoke();
  }

  getNewJoke() {
    const jokesCollection = collection(this.firestore, 'jokes');
    const jokes$ = collectionData(jokesCollection, { idField: 'id' });
    // get length of jokes
    const jokesLength$ = jokes$.pipe(map((jokes) => jokes.length));
    // set joke$ to a random joke
    this.joke$ = jokes$.pipe(
      map((jokes) => {
        const randomIndex = Math.floor(Math.random() * jokes.length);
        return jokes[randomIndex];
      })
    ) as Observable<IJoke>;
  }
}
