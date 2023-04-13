import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import IJoke from '../../types/IJoke';

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
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [],
})
export class JokeListComponent implements OnInit {
  readonly jokesCollection = collection(this.firestore, 'jokes');
  readonly jokes$: Observable<IJoke[]> = collectionData(
    this.jokesCollection,
    { idField: 'id' }
  ) as Observable<IJoke[]>;

  constructor(private firestore: Firestore) { }

  ngOnInit(): void { }
}
