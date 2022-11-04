import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbar bg-primary">
      <div class="navbar-start"></div>
      <div class="navbar-center">
        <img src="assets/img/nav-logo.jpg" alt="logo" class="logo h-20" />
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
