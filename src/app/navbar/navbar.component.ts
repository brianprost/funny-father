import { Component, OnInit } from '@angular/core';

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
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
