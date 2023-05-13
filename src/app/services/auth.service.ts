import { Injectable, inject } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private user$ = new BehaviorSubject<User | null>(this.firebaseAuth.currentUser);
  userSubject$ = this.user$.asObservable();

  constructor() {
    this.firebaseAuth.onAuthStateChanged((user) => {
      this.user$.next(user);
    });
  }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  async logout() {
    await this.firebaseAuth.signOut();
  }
}
