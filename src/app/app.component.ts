import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="bg-primary h-screen font-sans flex flex-col jusify-between">
      <div>
        <app-navbar [showAdvancedMenu]="true"></app-navbar>
      </div>
      <div>
        <router-outlet></router-outlet>
      </div>
      <div>
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Funny Father';
}
