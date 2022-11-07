import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import IJoke from 'src/app/types/IJoke';

@Component({
  selector: 'app-joke',
  template: `
    <app-setup [setup]="(joke | async)?.setup"></app-setup>
    <app-punchline [punchline]="(joke | async)?.punchline"></app-punchline>
  `,
  styles: [],
})
export class JokeComponent implements OnInit {
  @Input() joke: Observable<IJoke> | undefined;

  constructor() {}

  ngOnInit(): void {}
}
