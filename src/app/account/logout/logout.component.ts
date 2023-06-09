import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { interval, map } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
	selector: "app-logout",
	template: `
		<div class="flex justify-center items-center h-[70vh]">
			<h1>Logging you out now{{ dots$ | async }}</h1>
		</div>
	`,
	styles: [],
})
export class LogoutComponent {
	private router: Router = inject(Router);
	private authService = inject(AuthService);

	readonly dots$ = interval(500).pipe(map((value) => ".".repeat(value + 1)));

	constructor() {
		this.logout();
	}

	async logout() {
		await this.authService.logout();
		this.router.navigate(["/"]);
	}
}
