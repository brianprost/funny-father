import { Component, inject } from '@angular/core';
import { MobileDetectorService } from 'src/app/services/mobile-detector.service';

@Component({
  selector: 'app-made-by-brian',
  template: `
    <div
      class="text-md flex h-16 items-center flex-row gap-0 justify-between mx-4 text-primary-content mb-0 mt-0 text-sm"
    >
      <a
        href="https://brianprost.com/contact"
        target="_blank"
        class="hover:text-secondary-focus hover:underline hover:font-bold "
      >
        <ng-container *ngIf="(isMobile$ | async) === false"
          >Submit</ng-container
        >
        DMCA Complaint
      </a>
      <div class="text-sm">
        <ng-container *ngIf="(isMobile$ | async) === false"
          >made by: </ng-container
        >
        <a
          href="https://brianprost.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-xl border-2 border-accent-content py-2 px-3 font-title text-primary-content text-sm hover:bg-accent hover:text-base-100"
        >
          bRIAN pRōST
        </a>
      </div>
    </div>
  `,
  styles: [],
})
export class MadeByBrianComponent {
  private mobileDetectorService = inject(MobileDetectorService);
  isMobile$ = this.mobileDetectorService.isMobile$;
}
