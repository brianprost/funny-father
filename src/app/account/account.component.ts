import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { FunnyFatherUser } from '../models/FunnyFatherUser';

@Component({
  selector: 'app-account',
  template: `<div
    class="container mx-auto flex flex-col items-center h-3/4 justify-center"
  >
    <app-account-info></app-account-info>
  </div>`,
  styles: [],
})
export class AccountComponent {

}
