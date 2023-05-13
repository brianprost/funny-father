import { Component, Input, OnInit, inject } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Auth, User, user } from '@angular/fire/auth';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { FunnyFatherUser } from '../models/FunnyFatherUser';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc } from '@angular/fire/firestore';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbar bg-primary">
      <ng-container *ngIf="!showAdvancedMenu; else advancedMenu">
        <div class="navbar-start"></div>
        <div class="navbar-center">
          <a href="/"
            ><img src="assets/img/nav-logo.jpg" alt="logo" class="logo h-20"
          /></a>
        </div>
        <div class="navbar-end"></div>
      </ng-container>
    </div>

    <ng-template #advancedMenu>
      <div class="flex-1">
        <a href="/">
          <img src="assets/img/nav-logo.jpg" alt="logo" class="logo h-20" />
        </a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal rounded-xl p-0">
          <ng-container *ngIf="userProfile$ | async as userProfile; else unauthenticated">
            <li><a href="/">Home</a></li>
            <li><a href="/jokes">Jokes</a></li>
            <li tabindex="0">
              <p>
                {{ userProfile.firstName }} {{ userProfile.lastName }}
                <fa-icon [icon]="faChevronDown"></fa-icon>
              </p>
              <ul class="p-2 bg-base-100 rounded-l-xl">
                  <li><a href="/account">Account</a></li>
                  <!-- <li><a href="/account/jokes">My Jokes</a></li> -->
                  <li><a href="/account/favorites">My Favorites</a></li>
                  <li><a href="/account/logout">Logout</a></li>
                </ul>
              </li>
            </ng-container>
            <ng-template #unauthenticated>
              <li><a href="/account/login">Login</a></li>
            </ng-template>
        </ul>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class NavbarComponent {
  @Input() showAdvancedMenu = true;

  private authService = inject(AuthService);
  private userService = inject(UserService);
  userProfile$ = this.userService.userProfile;

  faChevronDown = faChevronDown;
}
