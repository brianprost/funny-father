import { Component, Input, OnInit } from '@angular/core';
import IJoke from 'src/app/types/IJoke';

@Component({
  selector: 'app-joke',
  template: `
    <h1 class="text-5xl xs:text-7xl font-bold">
      {{ joke?.setup }}
    </h1>
    <p class="py-6 text-4xl xs:text-5xl">
      {{ joke?.punchline }}
    </p>
  `,
  styles: [],
})
export class JokeComponent implements OnInit {
  @Input() joke: IJoke | undefined = undefined;

  constructor() {}

  ngOnInit(): void {}
}
