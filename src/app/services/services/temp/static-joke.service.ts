import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import IJoke from 'src/app/types/IJoke';

@Injectable({
  providedIn: 'root',
})
export class StaticJokeService {
  constructor(private http: HttpClient) {}

  // fetches a random joke from the api_url and returns it as an observable
  getRandomJoke(): Observable<IJoke> {
    return this.http.get<IJoke>(environment.RANDOM_JOKE_LAMBDA_ENDPOINT);
  }
}
