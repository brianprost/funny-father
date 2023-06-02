import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AddNewJokeComponent } from './jokes/add-new-joke/add-new-joke.component';
import { JokesComponent } from './jokes/jokes.component';
import { LogoutComponent } from './account/logout/logout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jokes', component: JokesComponent },
  // add new joke
  { path: 'jokes/add', component: AddNewJokeComponent},
  // account, and then account/login, account/signupaccount/info
  {
    path: 'account',
    component: AccountComponent,
  },
  {
    path: 'account/login',
    component: LoginComponent,
  },
  {
    path: 'account/logout',
    component: LogoutComponent,
  },
  {
    path: 'account/signup',
    component: SignupComponent,
  },
  {
    path: 'jokes/add',
    component: AddNewJokeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
