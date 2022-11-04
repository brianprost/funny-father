import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import IJoke from './types/IJoke';

@Component({
  selector: 'app-root',
  template: `
  <div class="bg-primary h-screen">
    <app-navbar></app-navbar>
      <div class="font-sans">
        <router-outlet></router-outlet>
      </div>
  </div> `,
  styles: [],
})
export class AppComponent {
  // this class is the landing page for the app, and will just display a random dad joke from the realtime database
  // the joke will be displayed in a card, and the card will have a button to get a new joke
  // the card will also have a button to add the joke to the user's favorites
  title = 'Funny Father';
}
