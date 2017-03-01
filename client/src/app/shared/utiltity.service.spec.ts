/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtiltityService } from './utiltity.service';

describe('UtiltityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtiltityService]
    });
  });

  it('should ...', inject([UtiltityService], (service: UtiltityService) => {
    expect(service).toBeTruthy();
  }));
});
