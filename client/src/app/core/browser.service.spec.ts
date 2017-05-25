/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BrowserService } from './browser.service';




describe('BrowserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserService]
    });
  });

  it('should ...', inject([BrowserService], (service: BrowserService) => {
    expect(service).toBeTruthy();
  }));

});

describe('BrowserService without the TestBed', () => {
  let browserService :  BrowserService;

  beforeEach(() => {browserService = new BrowserService();});

  it('#isChrome',()=>{
    expect(browserService.isChrome()).toBe(true);
  });
  it('#isFireFox',()=>{
    expect(browserService.isFireFox()).toBe(false);
  });
  it('#isIE',()=>{
    expect(browserService.isIE()).toBe(false);
  });
  it('#isSafari',()=>{
    expect(browserService.isSafari()).toBe(false);
  });
  it('#detectBrowser should return chrome for tester browser',()=>{
    expect(browserService.detectBrowser()).toBe('chrome');
  });
});

