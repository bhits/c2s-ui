/* tslint:disable:no-unused-variable */
import {ProviderAddressPipe} from "./provider-address.pipe";
import {UtilityService} from "../../shared/utility.service";
import {inject} from "@angular/core/testing";

describe('ProviderAddressPipe', () => {
  let utilityService = null;

  beforeEach(inject([UtilityService], (utilityService: UtilityService) => {
    utilityService = utilityService;
  }));

  it('create an instance', () => {
    const pipe = new ProviderAddressPipe(utilityService);
    expect(pipe).toBeTruthy();
  });
});
