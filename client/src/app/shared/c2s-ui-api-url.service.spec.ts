import {TestBed, async, inject} from '@angular/core/testing';
import {C2sUiApiUrlService} from './c2s-ui-api-url.service';

describe('C2sUiApiUrlService', () => {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [C2sUiApiUrlService]
    });
  });

  beforeEach(inject([C2sUiApiUrlService], s => {
    service = s;
  }));
  // test function
  it('should test for loginUrl', () => {
    expect(service.getLoginUrl()).toEqual(service.urls.get('loginUrl'));
  });

  it('should test for accountActivationUrl', () => {
    expect(service.getAccountActivationUrl()).toEqual(service.urls.get('accountActivationUrl'));
  });

  it('should test for accountActivationSuccessUrl', () => {
    expect(service.getAccountActivationSuccessUrl()).toEqual(service.urls.get('accountActivationSuccessUrl'));
  });

  it('should test for accountActivationErrorUrl', () => {
    expect(service.getAccountActivationErrorUrl()).toEqual(service.urls.get('accountActivationErrorUrl'));
  });

  it('should test for UmsBaseUrl', () => {
    expect(service.getUmsBaseUrl()).toEqual(service.urls.get('UmsBaseUrl'));
  });

  it('should test for getPcmBaseUrl', () => {
    expect(service.getPcmBaseUrl()).toEqual(service.urls.get('PcmBaseUrl'));
  });

  it('should test for getPlsBaseUrl', () => {
    expect(service.getPlsBaseUrl()).toEqual(service.urls.get('PlsBaseUrl'));
  });

  it('should test for VssBaseUrl', () => {
    expect(service.getVssBaseUrl()).toEqual(service.urls.get('VssBaseUrl'));
  });

  it('should test for PhrBaseUrl', () => {
    expect(service.getPhrBaseUrl()).toEqual(service.urls.get('PhrBaseUrl'));
  });

  it('should test for TryPolicyBaseUrl', () => {
    expect(service.getTryPolicyBaseUrl()).toEqual(service.urls.get('TryPolicyBaseUrl'));
  });
});
