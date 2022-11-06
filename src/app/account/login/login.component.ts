import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  template: `
    <div *ngIf="auth.user | async as user; else showLogin">
      <h1>Hello {{ user.displayName }}!</h1>
      <button (click)="logout()" )>Logout</button>
    </div>
    <ng-template #showLogin>
      <p>Please login.</p>
      <button (click)="login()">Login</button>
    </ng-template>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  constructor(public auth: AngularFireAuth) {}

  ngOnInit(): void {}

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }
}
