import { Component, OnInit } from '@angular/core';
import IJoke from '../types/IJoke';
import { Observable, map } from 'rxjs';
import { JokeService } from '../services/joke.service';
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
  joke$!: Observable<any>;

  constructor(firestore: Firestore) {
    const jokeCollection: any = collection(firestore, 'jokes');
    // get the joke from the 5th document in the collection
    console.log("collection:", jokeCollection);
    const allJokes: any = collectionData(jokeCollection);
    console.log("allJokes:", allJokes);
    
    
    // log all jokes
  }

  getNewJoke() {
  }
}
