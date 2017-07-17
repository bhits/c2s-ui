import { TestBed, inject } from '@angular/core/testing';

import { LimitedProfileService } from './limited-profile.service';

describe('LimitedProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LimitedProfileService]
    });
  });

  it('should ...', inject([LimitedProfileService], (service: LimitedProfileService) => {
    expect(service).toBeTruthy();
  }));
});
