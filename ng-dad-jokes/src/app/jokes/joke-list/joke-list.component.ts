import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import IJoke from '../../types/IJoke';

@Component({
  selector: 'app-joke-list',
  template: `
    <section class="overflow-x-auto container mx-auto">
      <table class="table w-full">
        <thead>
          <th>setup</th>
          <th>punchline</th>
        </thead>
        <tbody>
          <tr *ngFor="let joke of jokes | async">
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
  jokes: Observable<IJoke[]> | undefined;

  constructor(){}

  ngOnInit(): void {}
}
