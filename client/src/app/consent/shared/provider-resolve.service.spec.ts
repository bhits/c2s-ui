/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProviderResolveService } from './provider-resolve.service';

describe('ProviderResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProviderResolveService]
    });
  });

  it('should ...', inject([ProviderResolveService], (service: ProviderResolveService) => {
    expect(service).toBeTruthy();
  }));
});
