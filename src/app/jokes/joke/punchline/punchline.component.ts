import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-punchline',
  template: `
    <p class="py-6 text-4xl xs:text-5xl">
      {{ punchline }}
    </p>
  `,
  styles: [],
})
export class PunchlineComponent {
  @Input() punchline: string | undefined = '';
}
