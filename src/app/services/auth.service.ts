import { Injectable, inject } from "@angular/core";
import {
	Auth,
	User,
	user,
	signInWithEmailAndPassword,
	UserInfo,
	createUserWithEmailAndPassword,
} from "@angular/fire/auth";
import { Firestore, collection, doc, getDoc } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Observable, catchError, from, switchMap } from "rxjs";
import { untilDestroyed, UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Injectable({
	providedIn: "root",
})
export class AuthService {
	private firebaseAuth = inject(Auth);
	private router = inject(Router);
	private firestore = inject(Firestore);

	user$: Observable<User | null> = user(this.firebaseAuth);
	userInfo$: Observable<UserInfo | null> = user(this.firebaseAuth);
	isJokeWriter$: Observable<boolean> = this.user$.pipe(
		switchMap(() => this.isJokeWriter()),
		untilDestroyed(this)
	);

	async signUpWithEmailAndPassword(email: string, password: string) {
		from(createUserWithEmailAndPassword(this.firebaseAuth, email, password))
			.pipe(
				switchMap(() => this.router.navigate(["/"])),
				catchError((error) => {
					console.error("Sign up failed:", error);
					return [];
				})
			)
			.subscribe();
	}

	async login(email: string, password: string) {
		from(signInWithEmailAndPassword(this.firebaseAuth, email, password))
			.pipe(
				switchMap(() => this.router.navigate(["/"])),
				catchError((error) => {
					console.error("Login failed:", error);
					return [];
				})
			)
			.subscribe();
	}

	async logout() {
		await this.firebaseAuth.signOut();
	}

	async isJokeWriter() {
		const collectionRef = collection(this.firestore, "jokeWriters");
		const uid = this.firebaseAuth.currentUser?.uid; // typescript was being weird
		const docRef = doc(collectionRef, uid);
		const docSnap = await getDoc(docRef);
		return docSnap.exists();
	}
}
