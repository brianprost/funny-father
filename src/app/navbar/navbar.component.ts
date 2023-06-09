import { Component, Input, inject } from '@angular/core';
import {
  faChevronDown,
  faUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbar bg-primary sticky">
      <div class="flex-1">
        <a href="/">
          <img
            src="assets/img/nav-logo.jpg"
            alt="logo"
            class="logo h-20 hover:scale-105 transform transition-all duration-500 ease-in-out"
          />
        </a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <ng-container *ngIf="user$ | async as user; else unauthenticated">
            <li>
              <a href="/jokes">My Saved Jokes</a>
            </li>
            <li>
              <details>
                <summary
                  *ngIf="userInfo$ | async as userInfo"
                  class="text-sm lg:text-base dropdown dropdown-end"
                >
                  {{ userInfo.displayName ?? user.email }}
                </summary>
                <ul class="p-2 bg-base-100 w-full">
                  <li *ngIf="isJokeWriter$ | async"
                    ><a href="/jokes/add">Add Joke</a></li
                  >
                  <li
                    ><a href="/account"
                      ><fa-icon
                        [icon]="faUser"
                        class="text-primary-content"
                      />Account</a
                    ></li
                  >
                  <li
                    ><a href="/account/logout"
                      ><fa-icon
                        [icon]="faRightFromBracket"
                        class="text-primary-content"
                      />Logout</a
                    ></li
                  >
                </ul>
              </details>
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
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;
}
