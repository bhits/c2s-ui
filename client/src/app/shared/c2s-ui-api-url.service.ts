import {Injectable} from "@angular/core";

@Injectable()
export class C2sUiApiUrlService {

  urls: Map<string, string> = new Map(
    [
      // Internal routes maps
      ["loginUrl", "/login"],
      ["accountActivationUrl", "/account/activation"],
      ["accountActivationSuccessUrl", "/account/activation-success"],
      ["accountActivationErrorUrl", "/account/activation-error"],

      // External api Url maps
      ["PcmBaseUrl", "/c2s-ui-api/pcm"],
      ["PlsBaseUrl", "/c2s-ui-api/pls"],
      ["VssBaseUrl", "/c2s-ui-api/vss"],
      ["UmsBaseUrl", "/c2s-ui-api/ums"],
      ["PhrBaseUrl", "/c2s-ui-api/phr"],
      ["TryPolicyBaseUrl", "/c2s-ui-api/try-policy"]
    ]
  );

  constructor() {
  }

  getLoginUrl(): string {
    return this.urls.get('loginUrl');
  }

  getAccountActivationUrl(): string {
    return this.urls.get('accountActivationUrl');
  }

  getAccountActivationSuccessUrl(): string {
    return this.urls.get('accountActivationSuccessUrl');
  }

  getAccountActivationErrorUrl(): string {
    return this.urls.get('accountActivationErrorUrl');
  }

  getUmsBaseUrl(): string {
    return this.urls.get('UmsBaseUrl');
  }

  getPcmBaseUrl(): string {
    return this.urls.get('PcmBaseUrl');
  }

  getPlsBaseUrl(): string {
    return this.urls.get('PlsBaseUrl');
  }

  getVssBaseUrl(): string {
    return this.urls.get('VssBaseUrl');
  }

  getPhrBaseUrl(): string {
    return this.urls.get('PhrBaseUrl');
  }

  getTryPolicyBaseUrl(): string {
    return this.urls.get('TryPolicyBaseUrl');
  }
}
