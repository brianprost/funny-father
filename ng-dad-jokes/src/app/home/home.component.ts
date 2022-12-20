import { Component, OnInit } from '@angular/core';
import IJoke from '../types/IJoke';
import { Observable } from 'rxjs';
import { JokeService } from '../services/joke.service';

@Component({
  selector: 'app-home',
  template: `
    <section id="home" class="hero min-h-[calc(100vh-180px)] bg-primary">
      <div class="hero-content text-center text-neutral drop-shadow-sm">
        <div class="max-w-md">
          <ng-container *ngIf="joke$ | async as joke">
            <app-joke [joke]="joke"></app-joke>
          </ng-container>
          <br />
          <button class="btn btn-neutral" (click)="getNewJoke()">
            Get another joke
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  joke$!: Observable<IJoke>;

  constructor(private jokeService: JokeService) {}

  async ngOnInit() {
    await this.getNewJoke();
  }

  async getNewJoke() {
    this.joke$ = this.jokeService.getRandomJoke();
  }
}
