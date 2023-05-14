import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, doc, docData, collection, collectionData } from '@angular/fire/firestore';
import { FunnyFatherUser } from '../models/FunnyFatherUser';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private user$ = this.authService.user$.pipe(untilDestroyed(this))

  readonly userDocCollection = collection(this.firestore, 'users');
  readonly userDoc = collectionData(this.userDocCollection, { idField: 'id' }) as Observable<FunnyFatherUser[]>;
  private userProfile$: BehaviorSubject<FunnyFatherUser | null> = new BehaviorSubject<FunnyFatherUser | null>(null);
  readonly userProfile = this.userProfile$.asObservable();
}