import { TestBed, inject } from '@angular/core/testing';

import { HealthInformationResolveService } from './health-information-resolve.service';

describe('HealthInformationResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthInformationResolveService]
    });
  });

  it('should be created', inject([HealthInformationResolveService], (service: HealthInformationResolveService) => {
    expect(service).toBeTruthy();
  }));
});
