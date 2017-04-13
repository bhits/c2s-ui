/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import { ConsentProviderPipe } from './consent-provider.pipe';
import {UtilityService} from "./utility.service";

describe('ConsentProviderPipe', () => {

  let utilityService = null;

  beforeEach(inject([UtilityService], (utilityService: UtilityService) => {
    utilityService = utilityService;
  }));

  it('create an instance', () => {
    const pipe = new ConsentProviderPipe(utilityService);
    expect(pipe).toBeTruthy();
  });
});
