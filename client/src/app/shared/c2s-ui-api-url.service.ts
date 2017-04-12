import {Injectable} from "@angular/core";

@Injectable()
export class C2sUiApiUrlService {

  //TODO: get urls configuration from server side
  urls: Map<string, string> = new Map(
    [
      // Internal routes maps
      ["accountActivationUrl", "/account/activation"],
      ["accountActivationSuccessUrl", "/account/activation-success"],
      // External api Url maps
      //Todo: Change to correct url
      ["UmsBaseUrl", "http://localhost:9999/ums"],
      ["PcmBaseUrl", "/c2s-ui-api/pcm"],
      ["PlsBaseUrl", "/c2s-ui-api/pls"],
      ["VssBaseUrl", "/c2s-ui-api/vss"]
    ]
  );

  constructor() {
  }

  getAccountActivationUrl(): string {
    return this.urls.get('accountActivationUrl');
  }

  getAccountActivationSuccessUrl(): string {
    return this.urls.get('accountActivationSuccessUrl');
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
}
