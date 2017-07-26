import {inject, TestBed} from '@angular/core/testing';

import {ConsentActivityResolveService} from './consent-activity-resolve.service';

describe('ConsentActivityResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsentActivityResolveService]
    });
  });

  it('should ...', inject([ConsentActivityResolveService], (service: ConsentActivityResolveService) => {
    expect(service).toBeTruthy();
  }));
});
