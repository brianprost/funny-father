import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="avatar">
      <div class="w-48 mask mask-squircle">
        <img class="rounded-xl" src="https://placeimg.com/192/192/people" />
      </div>
    </div>
  `,
  styles: [],
})
export class AvatarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
