import { Injectable, inject } from '@angular/core';
import { Firestore, doc, docData, collection, collectionData } from '@angular/fire/firestore';
import { FunnyFatherUser } from '../models/FunnyFatherUser';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  readonly userDocCollection = collection(this.firestore, 'users');
  readonly userDoc = collectionData(this.userDocCollection, { idField: this.auth.currentUser?.uid });
  private userProfile$: BehaviorSubject<FunnyFatherUser> = new BehaviorSubject<FunnyFatherUser>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    photoURL: '',
  });

  constructor() {
    this.userDoc.subscribe((user) => {
      this.userProfile$.next(user[0] as FunnyFatherUser);
    }
    );
  }
  getUserProfile(): BehaviorSubject<FunnyFatherUser> {
    return this.userProfile$;
  }
}