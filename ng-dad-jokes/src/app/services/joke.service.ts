import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import IJoke from '../types/IJoke';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  constructor(private http: HttpClient) {}

  getRandomJoke(): Observable<IJoke> {
    // get a random joke from the api using the NODEJS_JOKE_ENDPOINT
    console.log('NODEJS_JOKE_ENDPOINT: ', environment.NODEJS_JOKE_ENDPOINT);

    return this.http.get<IJoke>(environment.NODEJS_JOKE_ENDPOINT);
  }
}
