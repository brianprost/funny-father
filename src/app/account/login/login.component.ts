import { Component, OnInit, Optional } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="container mx-auto flex justify-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <app-avatar></app-avatar>
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">Login</h2>
          <input
            type="email"
            placeholder="email"
            class="input input-bordered w-full max-w-xs"
          />
          <input
            type="password"
            placeholder="password"
            class="input input-bordered w-full max-w-xs"
          />
          <div class="card-actions">
            <button class="btn btn-primary" (click)="login()">Login</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  dummyData() {
    return {
      email: 'bprost94@gmail.com',
      password: 'rockon94',
    };
  }

  constructor(@Optional() private auth: Auth, private router: Router) {}

  ngOnInit(): void {}

  async login() {
    const { email, password } = this.dummyData();
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/jokes']);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
}
