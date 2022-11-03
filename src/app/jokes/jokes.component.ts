import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jokes',
  template: `
    <p>jokes works!</p>
    <app-joke-list></app-joke-list>
    <!-- <router-outlet></router-outlet> -->
  `,
  styles: [],
})
export class JokesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
