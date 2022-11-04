import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="bg-primary h-screen font-sans">
      <app-navbar></app-navbar>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  // this class is the landing page for the app, and will just display a random dad joke from the realtime database
  // the joke will be displayed in a card, and the card will have a button to get a new joke
  // the card will also have a button to add the joke to the user's favorites
  title = 'Funny Father';
}
