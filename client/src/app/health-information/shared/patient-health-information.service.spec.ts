import { TestBed, inject } from '@angular/core/testing';

import { PatientHealthInformationService } from './patient-health-information.service';

describe('PatientHealthInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientHealthInformationService]
    });
  });

  it('should be created', inject([PatientHealthInformationService], (service: PatientHealthInformationService) => {
    expect(service).toBeTruthy();
  }));
});
