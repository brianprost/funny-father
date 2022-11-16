import { Component, Input, OnInit } from '@angular/core';
import IJoke from 'src/app/types/IJoke';

@Component({
  selector: 'app-joke',
  template: `
    <app-setup [setup]="joke?.setup"></app-setup>
    <app-punchline [punchline]="joke?.punchline"></app-punchline>
  `,
  styles: [],
})
export class JokeComponent implements OnInit {
  @Input() joke: IJoke | undefined = undefined;

  constructor() {}

  ngOnInit(): void {}
}
