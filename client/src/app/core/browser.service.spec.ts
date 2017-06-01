/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BrowserService } from './browser.service';

// angualr cli generate test
describe('CustomTranslateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserService]
    });
  });

  it('should ...', inject([BrowserService], (service: BrowserService) => {
    expect(service).toBeTruthy();
  }));
});

describe('Service: BrowserService, test based on Chrome browser', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserService]
    });
  });

  beforeEach(inject([BrowserService], s => {
    service = s;
  }));

  it('should detect browser, detectBrwoser()',()=>{
      let detectedBrowser = service.detectBrowser();
      expect(detectedBrowser).toContain('chrome');
  });

  it('should be the chrome browser, isChrome()',()=>{
    let checkIsChromeBrowser = service.isChrome();
    expect(checkIsChromeBrowser).toBe(true);
  });

  it('should not be the FireFox browser, isFireFox()',()=>{
    let checkIsFireFoxBrowser = service.isFireFox();
    expect(checkIsFireFoxBrowser).not.toBe(true);
  });

  it('should not be the IE browser, isIE()',()=>{
    let checkIsIeBrowser = service.isIE();
    expect(checkIsIeBrowser).not.toBe(true);
  });

  it('should not be the Safari browser, isSafari()',()=>{
    let checkIsSafariBrowser = service.isSafari();
    expect(checkIsSafariBrowser ).not.toBe(true);
  });
});





