import { Component, OnInit, Optional } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { traceUntilFirst } from '@angular/fire/performance';
import { EMPTY, EmptyError, map, Observable, Subscription } from 'rxjs';
import { IUser } from '../models/IUser';

@Component({
  selector: 'app-account',
  template: `<div
    class="container mx-auto flex flex-col items-center h-3/4 justify-center"
  >
    <app-account-info></app-account-info>
  </div>`,
  styles: [],
})
export class AccountComponent implements OnInit {
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> | undefined;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(@Optional() private auth: Auth, private router: Router) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth)
        .pipe(
          traceUntilFirst('auth'),
          map((u) => !!u)
        )
        .subscribe((isLoggedIn) => {
          this.showLoginButton = !isLoggedIn;
          this.showLogoutButton = isLoggedIn;
        });
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async logout() {
    if (this.auth) {
      await this.auth.signOut();
      this.router.navigate(['/']);
    }
  }
}
