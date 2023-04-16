import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import IJoke from '../types/IJoke';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  private readonly jokesCollection = collection(this.firestore, 'jokes');
  private readonly jokes$ = collectionData(this.jokesCollection, { idField: 'id' });
  private readonly jokeListLength$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readonly featuredJoke$: BehaviorSubject<IJoke> = new BehaviorSubject<IJoke>({
    jokeId: NaN,
    setup: 'Ope!',
    punchline: 'Thinking of a new joke...',
    author: 'Midwestern Dad',
  });


  constructor(private readonly firestore: Firestore) {
    this.getLenthOfJokeList();
  }

  getLenthOfJokeList(): void {
    this.jokes$.subscribe((jokes) => {
      this.jokeListLength$.next(jokes.length);
    });
  }

  getRandomJoke() {
    // set featured joke to a random joke
    const randomJokeIndex = Math.floor(Math.random() * this.jokeListLength$.value);
    this.jokes$.pipe(
      map((jokes) => jokes[randomJokeIndex])
    ).subscribe((joke) => {
      this.featuredJoke$.next(joke as IJoke);
      console.log(this.featuredJoke$.value);
      
    });
  }
}
