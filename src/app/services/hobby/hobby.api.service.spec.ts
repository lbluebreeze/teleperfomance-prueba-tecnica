import { TestBed } from '@angular/core/testing';

import { HobbyApiService } from './hobby.api.service';

describe('HobbyApiService', () => {
  let service: HobbyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HobbyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
