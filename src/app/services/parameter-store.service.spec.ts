import { TestBed } from '@angular/core/testing';

import { ParameterStoreService } from './parameter-store.service';

describe('ParameterStoreService', () => {
  let service: ParameterStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParameterStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
