import { Component } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import IJoke from './types/IJoke';

@Component({
  selector: 'app-root',
  template: `
    <!-- {{ items }} -->
    <h1>motherrrrrr fucker</h1>
    <!-- display all jokes -->
    <table>
      <tr>
        <th>setup</th>
        <th>punchline</th>
      </tr>
      <tr *ngFor="let joke of jokes | async">

        <td>{{ joke.setup }}</td>
        <td>{{ joke.punchline }}</td>
      </tr>
    </table>

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'ng-dad-jokes';

  jokesRef: AngularFireList<any>;
  jokes: Observable<IJoke[]>;

  constructor(db: AngularFireDatabase) {
    this.jokesRef = db.list('jokes');
    this.jokes = this.jokesRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  addJoke(newJoke: string) {
    this.jokesRef.push({ text: newJoke });
  }
  updateJoke(key: string, newText: string) {
    this.jokesRef.update(key, { text: newText });
  }
  deleteItem(key: string) {
    this.jokesRef.remove(key);
  }
}
