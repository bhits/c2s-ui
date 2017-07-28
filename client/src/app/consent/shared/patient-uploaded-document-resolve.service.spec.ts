import { TestBed, inject } from '@angular/core/testing';

import { PatientUploadedDocumentResolveService } from './patient-uploaded-document-resolve.service';

describe('PatientUploadedDocumentResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientUploadedDocumentResolveService]
    });
  });

  it('should ...', inject([PatientUploadedDocumentResolveService], (service: PatientUploadedDocumentResolveService) => {
    expect(service).toBeTruthy();
  }));
});
