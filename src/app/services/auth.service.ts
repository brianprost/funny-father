import { Injectable, inject } from '@angular/core';
import { Auth, User, user, signInWithEmailAndPassword, UserInfo } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, from, map, switchMap, Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private router = inject(Router);
  user$: Observable<User | null> = user(this.firebaseAuth)
  userInfo$: Observable<UserInfo | null> = user(this.firebaseAuth);
  // userSubscription: Subscription = this.user$.pipe(untilDestroyed(this)).subscribe();

  async login(email: string, password: string) {
    from(signInWithEmailAndPassword(this.firebaseAuth, email, password))
      .pipe(
        switchMap(() => this.router.navigate(['/'])),
        catchError(error => {
          console.error('Login failed:', error);
          return [];
        })
      )
      .subscribe();
  }

  async logout() {
    await this.firebaseAuth.signOut();
  }
}
