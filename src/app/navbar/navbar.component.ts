import { Component, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbar bg-primary">
      <div class="navbar-start"></div>
      <div class="navbar-center">
        <a href="/"
          ><img src="assets/img/nav-logo.jpg" alt="logo" class="logo h-20"
        /></a>
      </div>
      <div class="navbar-end"></div>
    </div>
    <!-- <div class="navbar bg-primary">
      <div class="flex-1">
        <a href="/"
          ><img src="assets/img/nav-logo.jpg" alt="logo" class="logo h-20"
        /></a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal p-0">
          <li><a href="/">Home</a></li>
          <li><a href="/jokes">Jokes</a></li>
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
    </div> -->
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  // icons
  faChevronDown = faChevronDown;

  constructor() {}

  ngOnInit(): void {}
}
