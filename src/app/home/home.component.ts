import { Component, OnInit } from '@angular/core';
import IJoke from '../types/IJoke';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoService } from '../services/dynamo.service';

@Component({
  selector: 'app-home',
  template: `
    <section id="home" class="hero min-h-[calc(100vh-180px)] bg-primary">
      <div class="hero-content text-center text-neutral drop-shadow-sm">
        <div class="max-w-md">
          <app-joke [joke]="joke" *ngIf="joke"></app-joke>
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
  joke: IJoke = {
    id: NaN,
    setup: '',
    punchline: '',
  };

  constructor(private ddb: DynamoService) {}

  async ngOnInit() {
    await this.getNewJoke();
  }

  async getNewJoke() {
    let newJoke = await this.ddb.getRandomJoke();
    this.joke = newJoke;
  }

  async getJokeCount() {
    let count = await this.ddb.getJokeCount();
  }
}
