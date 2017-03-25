/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsentListResolveService } from './consent-list-resolve.service';

describe('ConsentListResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsentListResolveService]
    });
  });

  it('should ...', inject([ConsentListResolveService], (service: ConsentListResolveService) => {
    expect(service).toBeTruthy();
  }));
});
