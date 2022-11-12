import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamoService } from 'src/app/services/dynamo.service';
import IJoke from 'src/app/types/IJoke';

@Component({
  selector: 'app-add-new-joke',
  template: `
    <div class="flex flex-col justify-center items-center h-[50vh]">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Add new joke</h2>
          <form [formGroup]="newJokeFormGroup" (ngSubmit)="onSubmit()">
            <input
              type="text"
              id="setup"
              placeholder="Setup"
              class="input input-bordered w-full"
              formControlName="setup"
            />
            <input
              type="text"
              id="punchline"
              placeholder="Punchline"
              class="input input-bordered w-full"
              formControlName="punchline"
            />
            <div class="card-actions justify-end">
              <button type="submit" class="btn btn-primary">Add joke</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AddNewJokeComponent implements OnInit {
  newJokeFormGroup = new FormGroup({
    setup: new FormControl('', { nonNullable: true }),
    punchline: new FormControl('', { nonNullable: true }),
  });

  constructor(private ddb: DynamoService, private router: Router) {}

  ngOnInit(): void {}

  async addNewJoke(newJoke: IJoke) {
    await this.ddb.addNewJoke(newJoke);
  }

  // handle button click
  async onSubmit() {
    // TODO is it really the best idea to use 'as' here?
    // 1. get the joke from the form
    const newJoke: IJoke = {
      setup: this.newJokeFormGroup.get('setup')?.value as string,
      punchline: this.newJokeFormGroup.get('punchline')?.value as string,
    };
    // 2. add the joke
    await this.addNewJoke(newJoke);
    // 3. clear the form
    this.newJokeFormGroup.reset();
    // 4. navigate back to the joke list
    this.router.navigate(['/']);
  }
}
