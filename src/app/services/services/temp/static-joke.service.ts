import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticJokeService {

  api_url = 'https://u9h7fay121.execute-api.us-east-1.amazonaws.com/default/get_random_dad_joke'

  constructor() { }

  // fetches a random joke from the api_url. no parameters needed
  getRandomJoke() {
    return fetch(this.api_url)
      .then(response => response.json())
      .then(data => data.joke)
  }
}
