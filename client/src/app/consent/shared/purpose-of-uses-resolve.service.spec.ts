/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PurposeOfUsesResolveService } from './purpose-of-uses-resolve.service';

describe('PurposeOfUsesResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurposeOfUsesResolveService]
    });
  });

  it('should ...', inject([PurposeOfUsesResolveService], (service: PurposeOfUsesResolveService) => {
    expect(service).toBeTruthy();
  }));
});
