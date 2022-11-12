import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup',
  template: `
    <h1 class="text-5xl xs:text-7xl font-bold">
      {{ setup }}
    </h1>
  `,
  styles: [],
})
export class SetupComponent {
  @Input() setup: string | undefined = '';
}
