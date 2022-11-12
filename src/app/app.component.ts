import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="bg-primary h-screen font-sans">
      <app-navbar [showAdvancedMenu]="true"></app-navbar>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Funny Father';
}
