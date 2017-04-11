/* tslint:disable:no-unused-variable */

import {inject, TestBed} from "@angular/core/testing";
import {EmailTokenService} from "./email-token.service";

describe('EmailTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailTokenService]
    });
  });

  it('should ...', inject([EmailTokenService], (service: EmailTokenService) => {
    expect(service).toBeTruthy();
  }));
});
