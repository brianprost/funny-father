import { Component, Input, OnInit, inject } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Auth, User, user } from '@angular/fire/auth';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { FunnyFatherUser } from '../models/FunnyFatherUser';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc } from '@angular/fire/firestore';
import { UserService } from '../services/user.service';

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
        <a href="/"
          ><img src="assets/img/nav-logo.jpg" alt="logo" class="logo h-20"
        /></a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal p-0">
          <li><a href="/">Home</a></li>
          <li><a href="/jokes">Jokes</a></li>
          <li *ngIf="this.userProfile$ | async as userProfile"><a href="/account">{{userProfile.firstName}} {{ userProfile.lastName }}</a></li>
          <!-- <li *ngIf="
            this.user$ | async as user">
            {{ user.uid }}
          </li> -->
          <li tabindex="0">
            <a href="/account">
              Account
              <fa-icon [icon]="faChevronDown"></fa-icon>
            </a>
            <ul class="p-2 bg-base-100">
              <li><a href="/account/signup">Signup</a></li>
              <li><a href="/account/login">Login</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class NavbarComponent {
  @Input() showAdvancedMenu = true;

  faChevronDown = faChevronDown;
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  private firestore = inject(Firestore);
  private userService = inject(UserService);
  userProfile$: Observable<FunnyFatherUser> = this.userService.getUserProfile();
  // userProfile: BehaviorSubject<FunnyFatherUser> = new BehaviorSubject<FunnyFatherUser>(new FunnyFatherUser);

  // getUserProfile(): FunnyFatherUser {
  //   const user = this.user$;
  //   const userRef = collection(this.firestore, 'users');
  //   const userDoc = userRef.doc(user.uid);
  //   const userDocData = userDoc.get();
  //   const userProfile = userDocData.data();
  //   return userProfile;
  // }
}
