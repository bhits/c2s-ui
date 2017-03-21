/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { C2sUiApiUrlService } from './c2s-ui-api-url.service';

describe('C2sUiApiUrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [C2sUiApiUrlService]
    });
  });

  it('should ...', inject([C2sUiApiUrlService], (service: C2sUiApiUrlService) => {
    expect(service).toBeTruthy();
  }));
});
