import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JokesComponent } from './jokes/jokes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jokes', component: JokesComponent },
  // account, and then account/login, account/signupaccount/info
  // {
  //   path: 'account',
  //   component: AccountComponent,
  // },
  // {
  //   path: 'account/login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'account/signup',
  //   component: SignupComponent,
  // },
  // {
  //   path: 'jokes/add',
  //   component: AddNewJokeComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
