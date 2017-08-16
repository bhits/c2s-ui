import {Injectable} from "@angular/core";

@Injectable()
export class C2sUiApiUrlService {

  urls: Map<string, string> = new Map(
    [
      // Internal routes maps
      ["loginUrl", "/login"],
      ["homeUrl", "/home"],
      ["accountActivationUrl", "/account/activation"],
      ["accountActivationSuccessUrl", "/account/activation-success"],
      ["accountActivationErrorUrl", "/account/activation-error"],

      // External api Url maps
      ["PcmBaseUrl", "/c2s-ui-api/pcm"],
      ["PlsBaseUrl", "/c2s-ui-api/pls"],
      ["VssBaseUrl", "/c2s-ui-api/vss"],
      ["UmsBaseUrl", "/c2s-ui-api/ums"],
      ["UaaBaseUrl", "/c2s-ui-api/uaa"],
      ["PhrBaseUrl", "/c2s-ui-api/phr"],
      ["TryPolicyBaseUrl", "/c2s-ui-api/try-policy"],
      ["IExHubXdsbBaseUrl", "/c2s-ui-api/iexhub-xdsb"]
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
    return this.urls.get('UmsBaseUrl');
  }

  public getUaaBaseUrl(): string {
    return this.urls.get('UaaBaseUrl');
  }

  public getPcmBaseUrl(): string {
    return this.urls.get('PcmBaseUrl');
  }

  public getPlsBaseUrl(): string {
    return this.urls.get('PlsBaseUrl');
  }

  public getVssBaseUrl(): string {
    return this.urls.get('VssBaseUrl');
  }

  public getPhrBaseUrl(): string {
    return this.urls.get('PhrBaseUrl');
  }

  public getTryPolicyBaseUrl(): string {
    return this.urls.get('TryPolicyBaseUrl');
  }

  public getIExHubXdsbBaseUrl(): string {
    return this.urls.get('IExHubXdsbBaseUrl');
  }
}
