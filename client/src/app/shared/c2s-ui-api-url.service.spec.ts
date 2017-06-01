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
  it('should get loginUrl, test getLoginUrl() work', () => {
    expect(service.getLoginUrl()).toContain(service.urls.get('loginUrl'));
  });
  it('should get accountActivationUrl, test getAccountActivationUrl():  work', () => {
    expect(service. getAccountActivationUrl()).toContain(service.urls.get('accountActivationUrl'));
  });
  it('should get accountActivationSuccessUrl, test getAccountActivationSuccessUrl():  work', () => {
    expect(service.getAccountActivationSuccessUrl()).toContain(service.urls.get('accountActivationSuccessUrl'));
  });
  it('should get accountActivationErrorUrl, test getAccountActivationErrorUrl():  work', () => {
    expect(service.getAccountActivationErrorUrl()).toContain(service.urls.get('accountActivationErrorUrl'));
  });
  it('should get UmsBaseUrl, test UmsBaseUrl():  work', () => {
    expect(service.getUmsBaseUrl()).toContain(service.urls.get('UmsBaseUrl'));
  });
  it('should get PcmBaseUrl, test getPcmBaseUrl():  work', () => {
    expect(service.getPcmBaseUrl()).toContain(service.urls.get('PcmBaseUrl'));
  });
  it('should get PlsBaseUrl, test getPlsBaseUrl():  work', () => {
    expect(service.getPlsBaseUrl()).toContain(service.urls.get('PlsBaseUrl'));
  });
  it('should get VssBaseUrl, test getVssBaseUrl():  work', () => {
    expect(service.getVssBaseUrl()).toContain(service.urls.get('VssBaseUrl'));
  });
  it('should get PhrBaseUrl, test getPhrBaseUrl():  work', () => {
    expect(service.getPhrBaseUrl()).toContain(service.urls.get('PhrBaseUrl'));
  });
  it('should get TryPolicyBaseUrl, test getTryPolicyBaseUrl()):  work', () => {
    expect(service.getTryPolicyBaseUrl()).toContain(service.urls.get('TryPolicyBaseUrl'));
  });

});
