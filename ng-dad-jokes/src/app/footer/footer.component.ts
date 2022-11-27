import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="fixed bottom-0 w-full">
      <app-made-by-brian></app-made-by-brian>
    </div>
  `,
  styles: [],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
