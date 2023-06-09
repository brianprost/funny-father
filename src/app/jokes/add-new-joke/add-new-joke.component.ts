// GENERATED: 8f3c3d1c-5f9d-4c5c-9a2d-8f9d1d9d0b4d
import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { JokeService } from "src/app/services/joke.service";
import IJoke from "src/app/types/IJoke";

@Component({
	selector: "app-add-new-joke",
	template: `
		<div class="flex flex-col justify-center items-center h-[80vh]">
			<div class="card w-96 bg-base-100 shadow-xl">
				<ng-container *ngIf="isAppleDevice(); else getAMac">
					<div class="card-body">
						<ng-container
							*ngIf="readyForNewJoke$ | async; else submissionStatus"
						>
							<h2 class="card-title">Add new joke</h2>
							<form [formGroup]="newJokeFormGroup" (ngSubmit)="addNewJoke()">
								<input
									type="text"
									id="setup"
									placeholder="Setup"
									class="input input-bordered w-full my-2"
									formControlName="setup"
								/>
								<input
									type="text"
									id="punchline"
									placeholder="Punchline"
									class="input input-bordered w-full my-2"
									formControlName="punchline"
								/>
								<div class="card-actions justify-end mt-4">
									<button type="submit" class="btn btn-primary">
										Add joke
									</button>
								</div>
							</form>
						</ng-container>
						<ng-template #submissionStatus>
							<ng-container
								*ngIf="submissionStatusText$ | async as submissionStatusText"
							>
								<div class="flex flex-col justify-center items-center">
									<h3 class="text-2xl">{{ submissionStatusText }}</h3>
									<div class="spinner"></div>
								</div>
							</ng-container>
						</ng-template>
					</div>
				</ng-container>
			</div>
		</div>

		<ng-template #getAMac>
			<!-- No longer need to add noreferrer noopener: https://chromestatus.com/feature/6140064063029248 -->
			<a href="https://www.apple.com/mac/" target="_blank">
				<p
					class="flex flex-col justify-center items-center text-center link h-40 text-4xl mx-12"
				>
					Buy a Mac to add new jokes.
				</p>
			</a>
		</ng-template>
	`,
	styles: [],
})
export class AddNewJokeComponent {
	private authService = inject(AuthService);
	private jokeService = inject(JokeService);
	private router: Router = inject(Router);
	private formBuilder = inject(FormBuilder);

	readonly readyForNewJoke$: BehaviorSubject<boolean> = new BehaviorSubject(
		true
	);
	readonly submissionStatusText$: BehaviorSubject<string> = new BehaviorSubject(
		"Adding joke..."
	);

	newJokeFormGroup = new FormGroup({
		setup: new FormControl("", { nonNullable: true }),
		punchline: new FormControl("", { nonNullable: true }),
	});

	isAppleDevice(): boolean {
		// returns whether the device is an apple device, including iOS, iPadOS, macOS, watchOS, and tvOS
		const appleDevices = ["iPhone", "iPad", "iPod", "Macintosh", "Watch", "TV"];
		return appleDevices.some((device) =>
			window.navigator.userAgent.includes(device)
		);
	}

	async addNewJoke() {
		this.readyForNewJoke$.next(false);
		if (!this.newJokeFormGroup.invalid) {
			const { setup, punchline } = this.newJokeFormGroup.value as {
				setup: string;
				punchline: string;
			};

			await this.jokeService.addNewJoke(setup, punchline);
			// if joke was added successfully, set text to reflect that, wait 2 seconds and then reset the form
			this.submissionStatusText$.next("Joke added successfully 🎉");
			await new Promise((resolve) => setTimeout(resolve, 1500));
			this.submissionStatusText$.next("Adding joke...");
			this.newJokeFormGroup.reset();
		}
		this.readyForNewJoke$.next(true);
	}
}
