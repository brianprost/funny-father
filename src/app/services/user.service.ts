import { Injectable, inject } from '@angular/core';
import { Firestore, doc } from '@angular/fire/firestore';
import { FunnyFatherUser } from '../models/FunnyFatherUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);

  // getUserByUid(uid: string): Observable<User | null> {
  //   // const userDoc: doc<FunnyFatherUser> = this.firestore.doc(
  //     return null
  // }
}
