import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {Observable} from "rxjs";
import {UmsFullProfileView} from "./ums-full-profile-view.model";

@Injectable()
export class FullProfileService {
  private umsFullProfileUrl: string = this.c2sUiApiUrlService.getUmsBaseUrl() + "/users/fullProfile";

  constructor(private http: Http,
              private c2sUiApiUrlService: C2sUiApiUrlService) {
  }

  getUMSFullProfile(): Observable<UmsFullProfileView> {
    return this.http.get(this.umsFullProfileUrl)
      .map((resp: Response) => <any>(resp.json()));
  }
}
