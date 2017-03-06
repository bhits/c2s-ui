/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SensitivityPoliciesResolveService } from './sensitivity-policies-resolve.service';

describe('SensitivityPoliciesResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SensitivityPoliciesResolveService]
    });
  });

  it('should ...', inject([SensitivityPoliciesResolveService], (service: SensitivityPoliciesResolveService) => {
    expect(service).toBeTruthy();
  }));
});
