import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-made-by-brian',
  template: `
    <div
      class="text-md flex h-16 items-center justify-end bg-skin text-skin mx-4"
    >
      <p class="text-secondary-content">
        made by:
        <a
          href="https://brianprost.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-xl border-2 border-accent-content py-2 px-3 font-title text-2xl text-accent hover:bg-primary-focus hover:text-base-100"
        >
          bRIAN pRōST
        </a>
      </p>
    </div>
  `,
  styles: [],
})
export class MadeByBrianComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
