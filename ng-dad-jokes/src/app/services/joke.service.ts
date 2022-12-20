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
    return this.http.get<IJoke>(environment.NODEJS_JOKE_ENDPOINT);
  }
}
