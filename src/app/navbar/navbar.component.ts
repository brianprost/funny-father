import { Component, Input, inject } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbar bg-primary">
      <div class="flex-1">
        <a href="/">
          <img src="assets/img/nav-logo.jpg" alt="logo" class="logo h-20" />
        </a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal rounded-xl p-0">
          <ng-container *ngIf="user$ | async as user; else unauthenticated">
            <li tabindex="0">
              <p
                *ngIf="userInfo$ | async as userInfo"
                class="text-sm lg:text-base"
              >
                {{ userInfo.displayName ?? user.email }}
                <fa-icon [icon]="faChevronDown"></fa-icon>
              </p>
              <ul class="p-2 bg-base-100 rounded-l-xl w-full">
                <li><a href="/jokes">My Jokes</a></li>
                <li *ngIf="isJokeWriter$ | async"
                  ><a href="/jokes/add">Add Joke</a></li
                >
                <li><a href="/account">Account</a></li>
                <li><a href="/account/logout">Logout</a></li>
              </ul>
            </li>
          </ng-container>
          <ng-template #unauthenticated>
            <li><a href="/account/signup">Sign Up</a></li>
            <li><a href="/account/login">Login</a></li>
          </ng-template>
        </ul>
      </div>
    </div>
  `,
  styles: [],
})
export class NavbarComponent {
  @Input() showAdvancedMenu = true;
  authService = inject(AuthService);
  user$ = this.authService.user$.pipe(untilDestroyed(this));
  userInfo$ = this.authService.userInfo$.pipe(untilDestroyed(this));
  isJokeWriter$ = this.authService.isJokeWriter$.pipe(untilDestroyed(this));

  faChevronDown = faChevronDown;
}
