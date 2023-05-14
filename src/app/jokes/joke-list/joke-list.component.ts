import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import {
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import IJoke from '../../types/IJoke';
import { Auth, User, UserInfo, user } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JokeService } from 'src/app/services/joke.service';

@UntilDestroy()
@Component({
  selector: 'app-joke-list',
  template: `
    <ng-container *ngIf="userProfile$ | async as user">
      <section class="container mx-auto pb-20 flex justify-center">
        <table class="table w-[66vw]">
          <thead>
            <th>Setup</th>
            <th>Punchline</th>
          </thead>
          <tbody>
            <tr *ngFor="let joke of savedJokes$ | async">
              <!-- since firestore has to have a default document in a collection, filter out that empty one -->
              <ng-container *ngIf="joke['setup'] !== undefined">
                <td>{{ joke['setup'] }}</td>
                <td>{{ joke['punchline'] }}</td>
              </ng-container>
            </tr>
          </tbody>
        </table>
      </section>
    </ng-container>
  `,
  styles: [],
})
export class JokeListComponent {
  private firestore = inject(Firestore);
  private firebaseAuth = inject(Auth);
  private authService = inject(AuthService);
  private jokeService = inject(JokeService);

  userProfile$: Observable<UserInfo | null> = user(this.firebaseAuth);
  savedJokes$: BehaviorSubject<IJoke[]> = new BehaviorSubject<IJoke[]>([]);

  constructor() {
    this.getSavedJokes();
  }

  getSavedJokes() {
    this.userProfile$.pipe(untilDestroyed(this)).subscribe(user => {
      if (user) {
        collectionData(
          collection(this.firestore, `users/${user.uid}/saved-jokes`),
          { idField: 'jokeId' }
        ).subscribe(savedJokes => {
          this.savedJokes$.next(savedJokes as IJoke[]);
        });
      }
    });
  }

  // saveButtonClick(joke: IJoke, userUid: string): void {
  //   // get the user id from the userSubject$ observable
  //   addDoc(collection(this.firestore, `users/${userUid}/saved-jokes`), joke);
  //   alert(`Saved ${joke.jokeId} to your account!`);
  // }
  // }
}
