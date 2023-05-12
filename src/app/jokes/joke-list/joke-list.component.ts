import { Component, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import IJoke from '../../types/IJoke';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-joke-list',
  template: `
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
            <td><button class="btn btn-primary" type="button" (click)=saveButtonClick(joke)>Save</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [],
})
export class JokeListComponent {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  readonly jokesCollection = collection(this.firestore, 'jokes');
  readonly jokes$: Observable<IJoke[]> = collectionData(
    this.jokesCollection,
    { idField: 'id' }
  ) as Observable<IJoke[]>;

  saveButtonClick(joke: IJoke): void {
    const userId = this.auth.currentUser?.uid;
    if (userId) {
      addDoc(collection(this.firestore, `users/${userId}/savedJokes`), joke);
      alert(`Saved ${joke.jokeId} to your account!`)
    }
  }
}
