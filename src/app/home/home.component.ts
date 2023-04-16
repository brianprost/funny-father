import { Component, OnInit } from '@angular/core';
import IJoke from '../types/IJoke';
import { Observable, map } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { JokeService } from '../services/joke.service';

@Component({
  selector: 'app-home',
  template: `
    <section id="home" class="hero min-h-[calc(100vh-180px)] bg-primary">
      <div class="hero-content text-center text-neutral drop-shadow-sm">
        <div class="max-w-md">
            <app-joke></app-joke>
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

  constructor(private jokeService: JokeService) {
    this.getNewJoke();
  }

  getNewJoke(): void {
    this.jokeService.getRandomJoke();
  }
}
