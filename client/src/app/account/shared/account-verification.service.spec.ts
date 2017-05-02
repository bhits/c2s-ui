/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountVerificationService } from './account-verification.service';

describe('AccountVerificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountVerificationService]
    });
  });

  it('should ...', inject([AccountVerificationService], (service: AccountVerificationService) => {
    expect(service).toBeTruthy();
  }));
});
