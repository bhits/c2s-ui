import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {Observable} from "rxjs";
import {UmsLimitedProfile} from "./ums-limited-profile.model";
import {SessionStorageService} from "./session-storage.service";

@Injectable()
export class LimitedProfileService {
  private umsLimitedProfileUrl: string = this.c2sUiApiUrlService.getUmsBaseUrl() + "/user/profile";
  private UMS_PROFILE_KEY: string = 'c2s-ums-profile';

  constructor(private http: Http,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private sessionStorageService: SessionStorageService) {
  }

  public getUMSProfile(): Observable<UmsLimitedProfile> {
    return this.http.get(this.umsLimitedProfileUrl)
      .map((resp: Response) => <any>(resp.json()));
  }

  public setProfileInSessionStorage(profile: UmsLimitedProfile): void {
    this.sessionStorageService.setItemInSessionStorage(this.UMS_PROFILE_KEY, profile);
  }

  public getProfileFromSessionStorage(): UmsLimitedProfile {
    return this.sessionStorageService.getItemFromSessionStorage(this.UMS_PROFILE_KEY);
  }

  public getUserName(): string {
    let umsProfile: UmsLimitedProfile = this.getProfileFromSessionStorage();
    if (umsProfile) {
      return umsProfile.username;
    } else {
      return "";
    }
  }

  public getFullName(): string {
    let umsProfile: UmsLimitedProfile = this.getProfileFromSessionStorage();
    if (umsProfile) {
      return umsProfile.firstName + " " + umsProfile.lastName;
    } else {
      return "";
    }
  }

  //Todo: Change it when current user can manage multiple patients
  public getUserMrn(): string {
    let umsProfile: UmsLimitedProfile = this.getProfileFromSessionStorage();
    if (umsProfile) {
      return umsProfile.mrn;
    } else {
      return "";
    }
  }

  public getUserLocale(): string {
    let umsProfile: UmsLimitedProfile = this.getProfileFromSessionStorage();
    if (umsProfile) {
      return umsProfile.userLocale;
    } else {
      return "";
    }
  }

  public getUserBirthDate(): Date {
    let umsProfile: UmsLimitedProfile = this.getProfileFromSessionStorage();
    if (umsProfile) {
      return umsProfile.birthDate;
    } else {
      return null;
    }
  }
}
