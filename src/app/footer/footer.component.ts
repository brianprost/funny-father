import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="fixed bottom-0 w-full">
      <app-made-by-brian></app-made-by-brian>
      <h3>{{ versionNumber }}</h3>
    </div>
  `,
  styles: [],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // get version number from package.json
  get versionNumber(): string {
    return require('../../../package.json').version;
  }
}
