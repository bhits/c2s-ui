import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {Observable} from "rxjs";
import {UmsProfile} from "./ums-profile.model";
import {SessionStorageService} from "./session-storage.service";

@Injectable()
export class ProfileService {
  umsProfileUrl: string = this.c2sUiApiUrlService.getUmsBaseUrl() + "/users/profile";
  private UMS_PROFILE_KEY: string = 'c2s-ums-profile';

  constructor(private http: Http,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private sessionStorageService: SessionStorageService) {
  }

  getUMSProfile(): Observable<UmsProfile> {
    return this.http.get(this.umsProfileUrl)
      .map((resp: Response) => <any>(resp.json()));
  }

  setProfileInSessionStorage(profile: UmsProfile) {
    this.sessionStorageService.setItemInSessionStorage(this.UMS_PROFILE_KEY, profile);
  }

  getProfileFromSessionStorage(): UmsProfile {
    return this.sessionStorageService.getItemFromSessionStorage(this.UMS_PROFILE_KEY);
  }

  getUserName(): String{
    let umsProfile:UmsProfile = this.getProfileFromSessionStorage();
    if(umsProfile){
      return umsProfile.userName;
    } else {
      return "";
    }
  }

  getFullName(): string{
    let umsProfile:UmsProfile = this.getProfileFromSessionStorage();
    if(umsProfile){
      return umsProfile.firstName + " " + umsProfile.lastName;
    } else {
      return "";
    }
  }

  //Todo: Change it when current user can manage multiple patients
  getUserMrn(): string {
    let umsProfile: UmsProfile = this.sessionStorageService.getItemFromSessionStorage(this.UMS_PROFILE_KEY);
    if (umsProfile != null) {
      return umsProfile.mrn;
    }
  }

  deleteProfileFromSessionStorage() {
    this.sessionStorageService.removeItemFromSessionStorage(this.UMS_PROFILE_KEY);
  }

  getMRN(){
    let umsProfile:UmsProfile = this.getProfileFromSessionStorage();
    if(umsProfile){
      return umsProfile.mrn;
    }else {
      return "";
    }
  }

  getUserLocale(){
    let umsProfile:UmsProfile = this.getProfileFromSessionStorage();
    if(umsProfile){
      return umsProfile.userLocale;
    }else {
      return "";
    }
  }

  getUserBirthDate(){
    let umsProfile:UmsProfile = this.getProfileFromSessionStorage();
    if(umsProfile){
      return umsProfile.birthDate;
    }else {
      return null;
    }
  }


}
