import { TestBed } from '@angular/core/testing';

import { MobileDetectorService } from './mobile-detector.service';

describe('MobileDetectorService', () => {
  let service: MobileDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
