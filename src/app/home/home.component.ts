import { Component, inject } from "@angular/core";
import { JokeService } from "../services/joke.service";
import { AuthService } from "../services/auth.service";
import { BehaviorSubject } from "rxjs";
import { MobileDetectorService } from "../services/mobile-detector.service";

@Component({
	selector: "app-home",
	template: `
		<section id="home" class="hero min-h-[calc(100vh-180px)] bg-primary">
			<div class="hero-content text-center text-neutral drop-shadow-sm">
				<div class="max-w-md">
					<ng-container *ngIf="isMobile$ | async as isMobile; else desktop">
						<button class="btn-ghost rounded-xl" (click)="getNewJoke()">
							<app-joke></app-joke>
						</button>
					</ng-container>
					<ng-template #desktop>
						<app-joke></app-joke>
					</ng-template>
					<br />
					<div class="flex flex-col justify-center gap-4">
						<button
							class="btn btn-neutral mx-auto w-3/5 lg:w-1/2"
							(click)="getNewJoke()"
						>
							Get another joke
						</button>
						<button
							*ngIf="this.authService.user$ | async"
							class=""
							(click)="saveJokeToProfile()"
						>
							<ng-container *ngIf="saveJokeButtonText$ | async as text">{{
								text
							}}</ng-container>
						</button>
					</div>
				</div>
			</div>
		</section>
	`,
	styles: [],
})
export class HomeComponent {
	private jokeService = inject(JokeService);
	authService = inject(AuthService);
	mobileDetectorService = inject(MobileDetectorService);
	isMobile$ = this.mobileDetectorService.isMobile$;

	saveJokeButtonStyles = {
		default: "btn btn-accent w-1/3 mx-auto lg:btn-sm btn-outline text-xs",
		success: "btn btn-success w-1/3 mx-auto lg:btn-sm btn-outline text-xs",
		error: "btn btn-error w-1/3 mx-auto lg:btn-sm btn-outline text-xs",
	};
	saveJokeButtonText$: BehaviorSubject<string> = new BehaviorSubject<string>(
		"Save Joke"
	);
	saveJokeButtonStyle$: BehaviorSubject<string> = new BehaviorSubject<string>(
		this.saveJokeButtonStyles.default
	);

	getNewJoke(): void {
		this.jokeService.getRandomJoke();
		// TODO: get if this joke is already saved to profile

		this.resetSaveJokeButton();
	}

	resetSaveJokeButton(): void {
		this.saveJokeButtonText$.next("Save Joke");
		this.saveJokeButtonStyle$.next(this.saveJokeButtonStyles.default);
	}

	async saveJokeToProfile() {
		const saveJokeToFirestore = await this.jokeService.saveJokeToProfile(
			this.jokeService.featuredJoke$.value
		);
		this.saveJokeButtonText$.next(saveJokeToFirestore.message);
		saveJokeToFirestore.wasSuccess
			? this.saveJokeButtonStyle$.next(this.saveJokeButtonStyles.success)
			: this.saveJokeButtonStyle$.next(this.saveJokeButtonStyles.error);
	}
}
