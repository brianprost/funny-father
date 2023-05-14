import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, doc } from '@angular/fire/firestore';
import IJoke from '../types/IJoke';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);

  private readonly jokesCollection = collection(this.firestore, 'jokes');
  private readonly jokes$ = collectionData(this.jokesCollection, { idField: 'jokeId' });
  private readonly jokeListLength$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readonly featuredJoke$: BehaviorSubject<IJoke> = new BehaviorSubject<IJoke>({
    jokeId: NaN,
    setup: 'Ope!',
    punchline: 'Thinking of a new joke...',
    author: 'Midwestern Dad',
  });


  constructor() {
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
    });
  }

  async saveJokeToProfile(joke: IJoke) {
    console.log(joke)
    
    const userUid = this.firebaseAuth.currentUser?.uid;
    if (!userUid) {
      console.error('No user logged in');
      return;
    }
    
    const userSavedJokesCollection = collection(
      this.firestore,
      `users/${userUid}/saved-jokes`
    );
    const docData = {
      jokeId: joke.jokeId,
      setup: joke.setup,
      punchline: joke.punchline,
      author: joke.author,
    };

    // add with set doc and merge
    await addDoc(userSavedJokesCollection, docData);
    // await addDoc(userSavedJokesCollection, docData);



    // const collectionRef = collection(
    //   this.firestore,
    //   AuthService.USERS_SAVED_JOKES_COLLECTION
    // );
    // const docData = {
    //   // jokeId: joke.jokeId,
    //   setup: joke.setup,
    //   punchline: joke.punchline,
    //   author: joke.author,
    // };

    // await addDoc(collectionRef, docData)
  }
}
