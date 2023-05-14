import { Component, OnInit, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import IJoke from '../../types/IJoke';
import { Auth, User } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-joke-list',
  template: `
    <ng-container *ngIf="user$ | async as user">
      <section class="container mx-auto pb-20">
        <table class="table w-full">
          <thead>
            <th>setup</th>
            <th>punchline</th>
          </thead>
          <tbody>
            <tr *ngFor="let joke of jokes$ | async">
              <td>{{ joke.setup }}</td>
              <td>{{ joke.punchline }}</td>
              <td
                ><button
                  class="btn btn-primary"
                  type="button"
                  (click)="saveButtonClick(joke, user.uid)"
                  >Save</button
                ></td
              >
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
  private authService = inject(AuthService);
  readonly user$ = this.authService.user$.pipe(untilDestroyed(this));
  readonly jokesCollection = collection(this.firestore, 'jokes');
  readonly jokes$: Observable<IJoke[]> = collectionData(this.jokesCollection, {
    idField: 'id',
  }) as Observable<IJoke[]>;

  saveButtonClick(joke: IJoke, userUid: string): void {
    // get the user id from the userSubject$ observable
    addDoc(collection(this.firestore, `users/${userUid}/savedJokes`), joke);
    alert(`Saved ${joke.jokeId} to your account!`);
  }
}
