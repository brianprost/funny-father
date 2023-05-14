import { Component, OnInit, inject } from '@angular/core';
import { JokeService } from '../services/joke.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <section id="home" class="hero min-h-[calc(100vh-180px)] bg-primary">
      <div class="hero-content text-center text-neutral drop-shadow-sm">
        <div class="max-w-md">
            <app-joke></app-joke>
          <br />
          <button class="btn btn-neutral" (click)="getNewJoke()">
            Get another joke
          </button>
          <button class="btn btn-primary" (click)="saveJokeToProfile()">
          Save Joke
        </button>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  private jokeService = inject(JokeService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.getNewJoke();
  }

  getNewJoke(): void {
    this.jokeService.getRandomJoke();
  }

  saveJokeToProfile() {
    this.jokeService.saveJokeToProfile(this.jokeService.featuredJoke$.value);
  }
}
