import {Injectable} from "@angular/core";

@Injectable()
export class C2sUiApiUrlService {

  urls: Map<string, string> = new Map(
    [
      // Internal routes maps
      ["loginUrl", "/login"],
      ["homeUrl", "/home"],
      ["consentListUrl", "/consents"],
      ["consentCreateEditUrl", "/consents/consent-create-edit"],
      ["providerListUrl", "/providers"],
      ["providerSearchUrl", "/providers/provider-search"],
      ["accountActivationUrl", "/account/activation"],
      ["accountActivationSuccessUrl", "/account/activation-success"],
      ["accountActivationErrorUrl", "/account/activation-error"],

      // External api Url maps
      ["configBaseUrl","/c2s-ui-api/config"],
      ["pcmBaseUrl", "/c2s-ui-api/pcm"],
      ["plsBaseUrl", "/c2s-ui-api/pls"],
      ["vssBaseUrl", "/c2s-ui-api/vss"],
      ["umsBaseUrl", "/c2s-ui-api/ums"],
      ["uaaBaseUrl", "/c2s-ui-api/uaa"],
      ["phrBaseUrl", "/c2s-ui-api/phr"],
      ["tryPolicyBaseUrl", "/c2s-ui-api/try-policy"],
      ["iexHubXdsbBaseUrl", "/c2s-ui-api/iexhub-xdsb"]
    ]
  );

  constructor() {
  }

  public getLoginUrl(): string {
    return this.urls.get('loginUrl');
  }

  public getHomeUrl(): string {
    return this.urls.get('homeUrl');
  }

  public getConsentListUrl(): string {
    return this.urls.get('consentListUrl');
  }

  public getConsentCreateEditUrl(): string {
    return this.urls.get('consentCreateEditUrl');
  }

  public getProviderListUrl(): string {
    return this.urls.get('providerListUrl');
  }

  public getProviderSearchUrl(): string {
    return this.urls.get('providerSearchUrl');
  }

  public getAccountActivationUrl(): string {
    return this.urls.get('accountActivationUrl');
  }

  public getAccountActivationSuccessUrl(): string {
    return this.urls.get('accountActivationSuccessUrl');
  }

  public getAccountActivationErrorUrl(): string {
    return this.urls.get('accountActivationErrorUrl');
  }

  public getUmsBaseUrl(): string {
    return this.urls.get('umsBaseUrl');
  }

  public getUaaBaseUrl(): string {
    return this.urls.get('uaaBaseUrl');
  }

  public getPcmBaseUrl(): string {
    return this.urls.get('pcmBaseUrl');
  }

  public getPlsBaseUrl(): string {
    return this.urls.get('plsBaseUrl');
  }

  public getVssBaseUrl(): string {
    return this.urls.get('vssBaseUrl');
  }

  public getPhrBaseUrl(): string {
    return this.urls.get('phrBaseUrl');
  }

  public getTryPolicyBaseUrl(): string {
    return this.urls.get('tryPolicyBaseUrl');
  }

  public getIExHubXdsbBaseUrl(): string {
    return this.urls.get('iexHubXdsbBaseUrl');
  }

  public getConfigBaseUrl():string{
    return this.urls.get('configBaseUrl');
  }
}
