import { TestBed } from '@angular/core/testing';

import { StaticJokeService } from './static-joke.service';

describe('StaticJokeService', () => {
  let service: StaticJokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticJokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
