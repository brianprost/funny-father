import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import {
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
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
      <section
        class="container mx-auto pb-20 flex justify-center flex-col items-center gap-4"
      >
        <div
          class="card w-96 bg-base-100 shadow-xl"
          *ngFor="let joke of savedJokes$ | async"
        >
          <div class="card-body items-center text-center">
            <h2 class="card-title">{{ joke['setup'] }}</h2>
            <p>{{ joke['punchline'] }}</p>
            <!-- <div class="card-actions">
              <button
                class="btn btn-sm btn-outline btn-secondary text-secondary-content"
                >Throw out</button
              >
            </div> -->
          </div>
        </div>
      </section>
    </ng-container>
  `,
  styles: [],
})
export class JokeListComponent {
  private firestore = inject(Firestore);
  private firebaseAuth = inject(Auth);

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
}
