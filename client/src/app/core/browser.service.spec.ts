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

  it('#detectBrowser should return "Chrome"', () => {
    let detectedBrowser = service.detectBrowser();
    expect(detectedBrowser).toEqual('chrome');
  });

  it('#isChrome should return true', () => {
    let checkIsChromeBrowser = service.isChrome();
    expect(checkIsChromeBrowser).toEqual(true);
  });

  it('#isFireFox should return false', () => {
    let checkIsFireFoxBrowser = service.isFireFox();
    expect(checkIsFireFoxBrowser).toEqual(false);
  });

  it('#isIE should return false', () => {
    let checkIsIeBrowser = service.isIE();
    expect(checkIsIeBrowser).toEqual(false);
  });

  it('#isSafari should return false', () => {
    let checkIsSafariBrowser = service.isSafari();
    expect(checkIsSafariBrowser).toEqual(false);
  });
});





