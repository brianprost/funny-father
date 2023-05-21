import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  user,
  signInWithEmailAndPassword,
  UserInfo,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, catchError, from, switchMap } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private router = inject(Router);

  user$: Observable<User | null> = user(this.firebaseAuth);
  userInfo$: Observable<UserInfo | null> = user(this.firebaseAuth);

  async signUpWithEmailAndPassword(email: string, password: string) {
    from(createUserWithEmailAndPassword(this.firebaseAuth, email, password))
      .pipe(
        switchMap(() => this.router.navigate(['/'])),
        catchError(error => {
          console.error('Sign up failed:', error);
          return [];
        })
      )
      .subscribe();
  }

  // async signUpWithGoogle() {
  //   from(this.firebaseAuth.signInWithPopup(new GoogleAuthProvider()))
  //     .pipe(
  //       switchMap(() => this.router.navigate(['/'])),
  //       catchError(error => {
  //         console.error('Sign up failed:', error);
  //         return [];
  //       })
  //     )
  //     .subscribe();
  // }

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
