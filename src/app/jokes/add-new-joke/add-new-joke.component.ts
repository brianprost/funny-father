import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import IJoke from 'src/app/types/IJoke';

@Component({
  selector: 'app-add-new-joke',
  template: `
    <div class="flex flex-col justify-center items-center h-[80vh]">
      <div class="card w-96 bg-base-100 shadow-xl">
        <ng-container *ngIf="isAppleDevice(); else getAMac">
          <div class="card-body">
            <h2 class="card-title">Add new joke</h2>
            <form [formGroup]="newJokeFormGroup" (ngSubmit)="onSubmit()">
              <input
                type="text"
                id="setup"
                placeholder="Setup"
                class="input input-bordered w-full my-2"
                formControlName="setup"
              />
              <input
                type="text"
                id="punchline"
                placeholder="Punchline"
                class="input input-bordered w-full my-2"
                formControlName="punchline"
              />
              <div class="card-actions justify-end mt-4">
                <button type="submit" class="btn btn-primary">Add joke</button>
              </div>
            </form>
          </div>
        </ng-container>
      </div>
    </div>

    <ng-template #getAMac>
      <!-- No longer need to add noreferrer noopener: https://chromestatus.com/feature/6140064063029248 -->
      <a href="https://www.apple.com/mac/" target="_blank">
        <p
          class="flex flex-col justify-center items-center text-center link h-40 text-4xl mx-12"
        >
          Buy a Mac to add new jokes.
        </p>
      </a>
    </ng-template>
  `,
  styles: [],
})
export class AddNewJokeComponent implements OnInit {
  isAppleDevice(): boolean {
    // returns whether the device is an apple device, including iOS, iPadOS, macOS, watchOS, and tvOS
    const appleDevices = ['iPhone', 'iPad', 'iPod', 'Macintosh', 'Watch', 'TV'];
    return appleDevices.some((device) =>
      window.navigator.userAgent.includes(device)
    );
  }
  newJokeFormGroup = new FormGroup({
    setup: new FormControl('', { nonNullable: true }),
    punchline: new FormControl('', { nonNullable: true }),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {}

  async addNewJoke(newJoke: IJoke) {
    // await this.ddb.addNewJoke(newJoke);
  }

  // handle button click
  async onSubmit() {
    // TODO is it really the best idea to use 'as' here?
    // 1. get the joke from the form
    const newJoke: IJoke = {
      setup: this.newJokeFormGroup.get('setup')?.value as string,
      punchline: this.newJokeFormGroup.get('punchline')?.value as string,
      author: "anonymous because we haven't implemented auth yet",
    };
    // 2. add the joke
    await this.addNewJoke(newJoke);
    // 3. clear the form
    this.newJokeFormGroup.reset();
    // 4. navigate back to the joke list
    this.router.navigate(['/']);
  }
}
