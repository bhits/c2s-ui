import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {C2sUiApiUrlService} from "./c2s-ui-api-url.service";
import {Observable} from "rxjs";
import {UmsFullProfileView} from "../user-profile/shared/ums-full-profile-view.model";
import {UmsFullProfileUpdate} from "../user-profile/shared/ums-full-profile-update.model";

@Injectable()
export class FullProfileService {
  private umsFullProfileUrl: string = this.c2sUiApiUrlService.getUmsBaseUrl() + "/user/fullProfile";
  private umsProfileUpdateUrl: string = this.c2sUiApiUrlService.getUmsBaseUrl() + "/self-service/users";

  constructor(private http: Http,
              private c2sUiApiUrlService: C2sUiApiUrlService) {
  }

  getUMSFullProfile(): Observable<UmsFullProfileView> {
    return this.http.get(this.umsFullProfileUrl)
      .map((resp: Response) => <any>(resp.json()));
  }

  updateUMSProfile(userId: number, updateProfile: UmsFullProfileUpdate): Observable<UmsFullProfileView> {
    return this.http.put(this.umsProfileUpdateUrl + "/" + userId, updateProfile)
      .map((resp: Response) => <any>(resp.json()));
  }
}
