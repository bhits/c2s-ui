
import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers, URLSearchParams} from "@angular/http";

import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {Observable} from "rxjs";
import {UmsProfile} from "./ums-profile.model";

@Injectable()
export class ProfileService {
  umsProfileUrl: string = this.c2sUiApiUrlService.getUmsBaseUrl() + "/profile";

  constructor(
              private http: Http,
              private c2sUiApiUrlService: C2sUiApiUrlService,) {
  }

  getUMSProfile():Observable<UmsProfile>{
    return this.http.get(this.umsProfileUrl)
      .map((resp: Response) => <any>(resp.json()));
  }
}
