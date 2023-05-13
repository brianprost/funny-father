import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-logout',
  template: `
    <div class="flex justify-center items-center h-[70vh]">
      <h1>Logging you out now{{dots$ | async}}</h1>
    </div>
  `,
  styles: [
  ]
})
export class LogoutComponent {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  readonly dots$ = interval(500).pipe(
    map((value) => '.'.repeat(value + 1))
  );

  constructor() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }

}
