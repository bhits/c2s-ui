import {Injectable} from "@angular/core";

@Injectable()
export class C2sUiApiUrlService {

  //TODO: get urls configuration from server side
  urls: Map<string, string> = new Map(
    [
      ["PcmBaseUrl", "/c2s-ui-api/pcm/patients"],
      ["PlsBaseUrl", "/c2s-ui-api/pls"],
      ["VssBaseUrl", "/c2s-ui-api/vss"]
    ]
  );

  constructor() {
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
