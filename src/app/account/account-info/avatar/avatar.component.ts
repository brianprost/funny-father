import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="avatar">
      <div class="w-48 mask mask-squircle" *ngIf="userProfile$ | async as userProfile">
        <img src="{{ userProfile.photoUrl }}" />
      </div>
    </div>
  `,
  styles: [],
})
export class AvatarComponent {
  private userService = inject(UserService);
  userProfile$ = this.userService.getUserProfile();
}
