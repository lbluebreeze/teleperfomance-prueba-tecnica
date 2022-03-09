import { TestBed } from '@angular/core/testing';

import { UserHobbyApiService } from './user-hobby.api.service';

describe('UserHobbyApiService', () => {
  let service: UserHobbyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHobbyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
