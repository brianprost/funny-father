import { Component, inject } from '@angular/core';
import { Auth, UserInfo, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-info',
  template: `
    <div class="flex h-screen justify-center items-center">
      <div
        class="card w-96 bg-base-100 shadow-xl"
        *ngIf="userInfo$ | async as userInfo"
      >
        <figure class="px-10 pt-10" *ngIf>
          <app-avatar></app-avatar>
        </figure>
        <div class="card-body items-center text-center">
          <ng-container *ngFor="let attribute of userInfo | keyvalue">
            <!-- filter out anything that isn't displayName, email, phoneNumber, or photoUrl -->
            <ng-container
              *ngIf="
                attribute.key === 'displayName' ||
                attribute.key === 'email' ||
                attribute.key === 'phoneNumber'
              "
            >
              <h2 class="card-title" *ngIf="attribute.key === 'displayName'">
                {{ attribute.value ?? 'nameless person' }}
              </h2>
              <input
                *ngIf="attribute.key == 'displayName'"
                type="text"
                placeholder="{{ attribute.value ?? 'Your name' }}"
                class="input input-bordered w-full max-w-xs"
              />
              <input
                *ngIf="attribute.key == 'email'"
                type="email"
                placeholder="{{ attribute.value }}"
                class="input input-bordered w-full max-w-xs"
              />
              <input
                *ngIf="attribute.key == 'phoneNumber'"
                type="tel"
                placeholder="{{ attribute.value }}"
                class="input input-bordered w-full max-w-xs"
              />
              <!-- <input
                type="password"
                placeholder="*************"
                class="input input-bordered w-full max-w-xs"
              /> -->
            </ng-container>
          </ng-container>
          <div class="card-actions">
            <!-- make it disabled if the form hasn't been touched -->
            <button class="btn btn-primary">Update account</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AccountInfoComponent {
  private auth = inject(Auth);
  userInfo$: Observable<UserInfo | null> = user(this.auth);

  updateUserProfile() {
    // update any or all fields of the user's profile
  }
}
