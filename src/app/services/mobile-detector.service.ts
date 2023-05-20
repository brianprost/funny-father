import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MobileDetectorService {
  isMobile$: Observable<boolean>;

  constructor() {
    this.isMobile$ = this.createMobileObservable();
  }

  private createMobileObservable(): Observable<boolean> {
    const mobileMediaQuery = window.matchMedia('(max-width: 639px)');
    const mobileChanges$ = fromEvent<MediaQueryListEvent>(
      mobileMediaQuery,
      'change'
    );

    return mobileChanges$.pipe(
      map(event => event.matches),
      startWith(mobileMediaQuery.matches)
    );
  }
}
