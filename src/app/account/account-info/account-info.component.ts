import { Component, OnInit, inject } from "@angular/core";
import {
	Auth,
	UserInfo,
	user,
	updateProfile,
	updateEmail,
	updatePassword,
} from "@angular/fire/auth";
import { FormBuilder, Validators } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable, first } from "rxjs";

@UntilDestroy()
@Component({
	selector: "app-account-info",
	template: `
		<div class="flex h-screen justify-center items-center">
			<div
				class="card w-96 bg-base-100 shadow-xl"
				*ngIf="userProfile$ | async as user"
			>
				<figure class="px-10 pt-10">
					<app-avatar></app-avatar>
				</figure>
				<div class="card-body items-center text-center">
					<h2 class="card-title">
						{{ user.displayName ?? "nameless person" }}
					</h2>
					<form [formGroup]="profileForm" (ngSubmit)="updateUserProfile()">
						<input
							type="text"
							placeholder="{{ user.displayName ?? 'Your name' }}"
							formControlName="displayName"
							class="input input-bordered w-full max-w-xs"
						/>
						<input
							type="email"
							placeholder="{{ user.email }}"
							formControlName="email"
							class="input input-bordered w-full max-w-xs"
						/>
						<!-- <input
              type="password"
              placeholder="New password"
              formControlName="password"
              class="input input-bordered w-full max-w-xs"
            /> -->
						<!-- <input
              type="tel"
              placeholder="{{ user.phoneNumber }}"
              formControlName="phoneNumber"
              class="input input-bordered w-full max-w-xs"
            /> -->
						<div class="card-actions">
							<button
								class="btn btn-primary"
								[disabled]="!profileForm.dirty"
								type="submit"
							>
								Update account
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	`,
	styles: [],
})
export class AccountInfoComponent implements OnInit {
	private auth = inject(Auth);
	private fb = inject(FormBuilder);
	userProfile$: Observable<UserInfo | null> = user(this.auth);

	profileForm = this.fb.group({
		displayName: [""],
		email: ["", Validators.email],
		// phoneNumber: [''],
		password: ["", Validators.minLength(12)],
	});

	ngOnInit() {
		this.userProfile$.pipe(untilDestroyed(this)).subscribe((userInfo) =>
			this.profileForm.patchValue({
				displayName: userInfo?.displayName,
				email: userInfo?.email,
				// phoneNumber: userInfo?.phoneNumber,
			})
		);
	}

	updateUserProfile() {
		if (this.profileForm.valid) {
			const { displayName, email } = this.profileForm.value;
			const fbUser = this.auth.currentUser;
			this.userProfile$.pipe(first()).subscribe((user) => {
				if (user) {
					updateProfile(fbUser!, {
						displayName,
						photoURL: user.photoURL,
					});
					updateEmail(fbUser!, email!);
					updatePassword(fbUser!, "password");
				}
			});
		}
	}
}
