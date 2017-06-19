import {TestBed, async, inject} from '@angular/core/testing';
import {BrowserService} from './browser.service';

describe('BrowserService', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserService]
    });
  });

  beforeEach(inject([BrowserService], s => {
    service = s;
  }));

  it('should detect Chrome browser', () => {
    let detectedBrowser = service.detectBrowser();
    expect(detectedBrowser).toEqual('chrome');
  });

  it('should test for Chrome browser', () => {
    let checkIsChromeBrowser = service.isChrome();
    expect(checkIsChromeBrowser).toEqual(true);
  });

  it('should test for FireFox browser', () => {
    let checkIsFireFoxBrowser = service.isFireFox();
    expect(checkIsFireFoxBrowser).toEqual(false);
  });

  it('should test for IE browser', () => {
    let checkIsIeBrowser = service.isIE();
    expect(checkIsIeBrowser).toEqual(false);
  });

  it('should test for Safari browser', () => {
    let checkIsSafariBrowser = service.isSafari();
    expect(checkIsSafariBrowser).toEqual(false);
  });
});





