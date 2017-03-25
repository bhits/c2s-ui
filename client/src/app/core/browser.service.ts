import {Injectable} from "@angular/core";

@Injectable()
export class BrowserService {

  constructor() {
  }

  detectBrowser(): string {
    const userAgent = window.navigator.userAgent;
    const browsers = {
      chrome: /chrome/i,
      safari: /safari/i,
      firefox: /firefox/i,
      ie: /internet explorer/i
    }

    for (let key in browsers) {
      if (browsers[key].test(userAgent)) {
        return key;
      }
    }
    return 'unknown';
  }

  isChrome(): boolean {
    return this.detectBrowser() === 'chrome';
  }

  isFireFox(): boolean {
    return this.detectBrowser() === 'firefox';
  }

  isIE(): boolean {
    return this.detectBrowser() === 'ie' || navigator.appVersion.toString().indexOf('.NET') > 0;
  }

  isSafari(): boolean {
    return this.detectBrowser() === 'safari';
  }
}
