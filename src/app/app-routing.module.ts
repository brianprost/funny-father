import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { HomeComponent } from './home/home.component';
import { JokeListComponent } from './jokes/joke-list/joke-list.component';
import { JokesComponent } from './jokes/jokes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jokes', component: JokesComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
