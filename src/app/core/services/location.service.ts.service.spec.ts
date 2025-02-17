import { TestBed } from '@angular/core/testing';

import { LocationServiceTsService } from './location.service.ts.service';

describe('LocationServiceTsService', () => {
  let service: LocationServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
