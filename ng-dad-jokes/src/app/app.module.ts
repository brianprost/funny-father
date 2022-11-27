import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { JokesComponent } from './jokes/jokes.component';
import { JokeListComponent } from './jokes/joke-list/joke-list.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MadeByBrianComponent } from './footer/made-by-brian/made-by-brian.component';
import { FooterComponent } from './footer/footer.component';
import { JokeComponent } from './jokes/joke/joke.component';
import { AccountComponent } from './account/account.component';
import { AccountInfoComponent } from './account/account-info/account-info.component';
import { AvatarComponent } from './account/account-info/avatar/avatar.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { AddNewJokeComponent } from './jokes/add-new-joke/add-new-joke.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    JokesComponent,
    JokeListComponent,
    HomeComponent,
    NavbarComponent,
    MadeByBrianComponent,
    FooterComponent,
    JokeComponent,
    AccountComponent,
    AccountInfoComponent,
    AvatarComponent,
    LoginComponent,
    SignupComponent,
    AddNewJokeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
