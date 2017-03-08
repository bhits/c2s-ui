/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {ProviderListResolveService} from "./provider-list-resolve.service";

describe('ProviderListResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProviderListResolveService]
    });
  });

  it('should ...', inject([ProviderListResolveService], (service: ProviderListResolveService) => {
    expect(service).toBeTruthy();
  }));
});
