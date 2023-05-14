import { Component, OnInit, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { FunnyFatherUser } from 'src/app/models/FunnyFatherUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-info',
  template: `
    <div class="flex h-screen justify-center items-center">
      <div class="card w-96 bg-base-100 shadow-xl" *ngIf="userProfile$ | async as userProfile">
        <figure class="px-10 pt-10">
          <app-avatar></app-avatar>
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{{userProfile.firstName}} {{ userProfile.lastName }}</h2>
          <ng-container *ngFor="let attribute of [userProfile.email, userProfile.phone]">
            <p>{{ attribute }}</p>
          <!-- <input
            type="email"
            placeholder="{{ userProfile.email }}"
            class="input input-bordered w-full max-w-xs"
          />
          <input
            type="tel"
            placeholder="{{ userProfile.phone }}"
            class="input input-bordered w-full max-w-xs"
          />
          <input
            type="password"
            placeholder="*************"
            class="input input-bordered w-full max-w-xs"
          />
          <div class="card-actions">
            <button class="btn btn-primary">Update account</button>
          </div> -->
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AccountInfoComponent {
  userService = inject(UserService);
  userProfile$: Observable<FunnyFatherUser | null> = this.userService.userProfile;

  updateUserProfile() {
    // do update user profile
  }

  constructor() {
    this.userProfile$.subscribe((user) => {
      console.log(user);
    });
  }
}
