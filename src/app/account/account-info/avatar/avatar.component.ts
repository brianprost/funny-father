import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-avatar',
  template: `
    <div class="avatar">
      <div class="w-48 mask mask-squircle">
        <img
          src="{{
            photoURL ??
              'https://media.tenor.com/images/4eb6bb2dfbe0493ad1f08d840d2270fb/raw'
          }}"
        />
      </div>
    </div>
  `,
  styles: [],
})
export class AvatarComponent {
  @Input() photoURL: string | null = null;
}
