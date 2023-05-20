import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FunnyFatherUser } from '../models/FunnyFatherUser';
import { BehaviorSubject, Observable } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);

  readonly userDocCollection = collection(this.firestore, 'users');
  readonly userDoc = collectionData(this.userDocCollection, { idField: 'id' }) as Observable<FunnyFatherUser[]>;
  private userProfile$: BehaviorSubject<FunnyFatherUser | null> = new BehaviorSubject<FunnyFatherUser | null>(null);
  readonly userProfile = this.userProfile$.asObservable();
}