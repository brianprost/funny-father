import { Injectable, inject } from '@angular/core';
import { Firestore, doc } from '@angular/fire/firestore';
import { IUser } from '../models/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);

  // getUserByUid(uid: string): Observable<User | null> {
  //   // const userDoc: doc<IUser> = this.firestore.doc(
  //     return null
  // }
}
