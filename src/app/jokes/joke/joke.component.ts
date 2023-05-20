import { Component, inject } from '@angular/core';
import { JokeService } from 'src/app/services/joke.service';

@Component({
  selector: 'app-joke',
  template: `
    <ng-container *ngIf="joke$ | async as joke">
      <h1 class="text-5xl xs:text-7xl font-bold">
        {{ joke.setup }}
      </h1>
      <p class="py-6 text-4xl xs:text-5xl">
        {{ joke.punchline }}
      </p>
    </ng-container>
  `,
  styles: [],
})
export class JokeComponent {
  private jokeService = inject(JokeService);
  readonly joke$ = this.jokeService.featuredJoke$;
}
