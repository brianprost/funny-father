import { Component } from '@angular/core';

@Component({
  selector: 'app-made-by-brian',
  template: `
    <div
      class="text-md flex h-16 items-center flex-col lg:flex-row gap-4 lg:gap-0 lg:justify-between mx-4 text-secondary-content lg:text-primary-content mt-4 mb-6 lg:mb-0 lg:mt-0 text-md"
    >
      <a
        href="https://brianprost.com/contact"
        target="_blank"
        class="hover:text-secondary-focus hover:underline hover:font-bold "
      >
        Submit DMCA Complaint
      </a>
      <div class="text-md">
        initially made by:
        <a
          href="https://brianprost.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-xl border-2 border-accent-content py-2 px-3 font-title text-accent text-xl hover:bg-accent hover:text-base-100"
        >
          bRIAN pRōST
        </a>
      </div>
    </div>
  `,
  styles: [],
})
export class MadeByBrianComponent {}
