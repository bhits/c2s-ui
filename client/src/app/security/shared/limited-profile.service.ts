import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {Observable} from "rxjs";
import {UmsLimitedProfile} from "./ums-limited-profile.model";
import {SessionStorageService} from "./session-storage.service";
import {AvatarImage} from "../../user-avatar/shared/avatar-image.model";
import {ExceptionService} from "../../core/exception.service";
import {isNullOrUndefined} from "util";

@Injectable()
export class LimitedProfileService {
  private umsLimitedProfileUrl: string = this.c2sUiApiUrlService.getUmsBaseUrl() + "/user/profile";
  private umsUserAvatarUrl: string = this.c2sUiApiUrlService.getUmsBaseUrl() + "/user-avatars/";
  private UMS_PROFILE_KEY: string = 'c2s-ums-profile';
  private AVATAR_IMG_KEY: string = 'c2s-avatar-image';

  constructor(private http: Http,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private sessionStorageService: SessionStorageService,
              private exceptionService: ExceptionService) {
  }

  getUMSProfile(): Observable<UmsLimitedProfile> {
    return this.http.get(this.umsLimitedProfileUrl)
      .map((resp: Response) => <any>(resp.json()));
  }

  getAvatarImageFromServer(): Observable<AvatarImage> {
    let umsLimitedProfile: UmsLimitedProfile = this.getProfileFromSessionStorage();

    if (!isNullOrUndefined(umsLimitedProfile)) {
      const GET_AVATAR_URL: string = this.umsUserAvatarUrl.concat("/user/" + umsLimitedProfile.userId + "/avatar");

      return this.http.get(GET_AVATAR_URL)
        .map((resp: Response) => <AvatarImage>(resp.json()))
        .catch(this.exceptionService.handleErrorWithErrorCode);
    }
  }

  getAvatarImageFromSessionStorage(): AvatarImage {
    return this.sessionStorageService.getItemFromSessionStorage(this.AVATAR_IMG_KEY);
  }

  getAvatarImage(): Observable<AvatarImage> {
    let avatarImage: AvatarImage = this.getAvatarImageFromSessionStorage();

    if (!isNullOrUndefined(avatarImage)) {
      console.log(avatarImage);
      return Observable.of(avatarImage)
        .map(avatarImage => avatarImage);
    } else {
      return this.getAvatarImageFromServer()
        .do(
          (data) => {
            console.log(data);
            let imgFromServer: AvatarImage = data;
            this.sessionStorageService.setItemInSessionStorage(this.AVATAR_IMG_KEY, imgFromServer);
            return imgFromServer;
          },
          (err) => {
            console.log(err);
            return this.exceptionService.handleErrorWithErrorCode(err);
          }
        );
    }
  }

  setProfileInSessionStorage(profile: UmsLimitedProfile) {
    this.sessionStorageService.setItemInSessionStorage(this.UMS_PROFILE_KEY, profile);
  }

  getProfileFromSessionStorage(): UmsLimitedProfile {
    return this.sessionStorageService.getItemFromSessionStorage(this.UMS_PROFILE_KEY);
  }

  getUserName(): String{
    let umsProfile:UmsLimitedProfile = this.getProfileFromSessionStorage();
    if(umsProfile){
      return umsProfile.userName;
    } else {
      return "";
    }
  }

  getFullName(): string{
    let umsProfile:UmsLimitedProfile = this.getProfileFromSessionStorage();
    if(umsProfile){
      return umsProfile.firstName + " " + umsProfile.lastName;
    } else {
      return "";
    }
  }

  //Todo: Change it when current user can manage multiple patients
  getUserMrn(): string {
    let umsProfile: UmsLimitedProfile = this.sessionStorageService.getItemFromSessionStorage(this.UMS_PROFILE_KEY);
    if (umsProfile != null) {
      return umsProfile.mrn;
    }
  }

  deleteProfileFromSessionStorage() {
    this.sessionStorageService.removeItemFromSessionStorage(this.UMS_PROFILE_KEY);
  }

  deleteAvatarFromSessionStorage() {
    this.sessionStorageService.removeItemFromSessionStorage(this.AVATAR_IMG_KEY);
  }

  getMRN(){
    let umsProfile:UmsLimitedProfile = this.getProfileFromSessionStorage();
    if(umsProfile){
      return umsProfile.mrn;
    }else {
      return "";
    }
  }

  getUserLocale(){
    let umsProfile:UmsLimitedProfile = this.getProfileFromSessionStorage();
    if(umsProfile){
      return umsProfile.userLocale;
    }else {
      return "";
    }
  }

  getUserBirthDate(){
    let umsProfile:UmsLimitedProfile = this.getProfileFromSessionStorage();
    if(umsProfile){
      return umsProfile.birthDate;
    }else {
      return null;
    }
  }
}
