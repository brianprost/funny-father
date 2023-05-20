import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDocs,
} from '@angular/fire/firestore';
import IJoke from '../types/IJoke';
import { Auth, UserInfo, user } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  userProfile$: Observable<UserInfo | null> = user(this.firebaseAuth);

  private readonly jokesCollection = collection(this.firestore, 'jokes');
  private readonly jokes$ = collectionData(this.jokesCollection, {
    idField: 'jokeId',
  });
  private readonly jokeListLength$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
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
    this.jokes$.subscribe(jokes => {
      this.jokeListLength$.next(jokes.length);
    });
  }

  getRandomJoke() {
    // set featured joke to a random joke
    const randomJokeIndex = Math.floor(
      Math.random() * this.jokeListLength$.value
    );
    this.jokes$.pipe(map(jokes => jokes[randomJokeIndex])).subscribe(joke => {
      this.featuredJoke$.next(joke as IJoke);
    });
  }

  async saveJokeToProfile(joke: IJoke) {
    let wasSuccess = false;
    let message = '';

    const userUid = this.firebaseAuth.currentUser?.uid;
    if (!userUid) {
      console.error('No user logged in');
      wasSuccess = false;
      message = 'No user logged in';
    } else {
      try {
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
        const docRef = await addDoc(userSavedJokesCollection, docData);
        // determine if was successful
        if (docRef.id) {
          wasSuccess = true;
          message = 'Joke saved successfully';
        }
      } catch (error) {
        console.error(error);
        wasSuccess = false;
        message = 'Error saving joke';
      }
    }
    return { wasSuccess, message };
  }
}
