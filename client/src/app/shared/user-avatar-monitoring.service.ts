import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {AvatarImage} from "../user-avatar/shared/avatar-image.model";
import {UmsLimitedProfile} from "../security/shared/ums-limited-profile.model";
import {LimitedProfileService} from "../security/shared/limited-profile.service";
import {ExceptionService} from "../core/exception.service";
import {C2sUiApiUrlService} from "./c2s-ui-api-url.service";
import {SessionStorageService} from "../security/shared/session-storage.service";
import {isNullOrUndefined} from "util";

@Injectable()
export class UserAvatarMonitoringService {
  private AVATAR_IMG_KEY: string = 'c2s-avatar-image';
  private umsUserAvatarUrl: string = this.c2sUiApiUrlService.getUmsBaseUrl() + "/user-avatars";

  userAvatarSource: BehaviorSubject<AvatarImage> = new BehaviorSubject<AvatarImage>(new AvatarImage());

  constructor(private http: Http,
              private sessionStorageService: SessionStorageService,
              private limitedProfileService: LimitedProfileService,
              private exceptionService: ExceptionService,
              private c2sUiApiUrlService: C2sUiApiUrlService) {
  }

  changeUserAvatar(newUserAvatar: AvatarImage): void {
    this.setAvatarImageInSessionStorage(newUserAvatar);
    this.userAvatarSource.next(newUserAvatar);
  }

  getAvatarImageFromSessionStorage(): AvatarImage {
    return this.sessionStorageService.getItemFromSessionStorage(this.AVATAR_IMG_KEY);
  }

  deleteAvatarFromSessionStorage(): void {
    this.clearAvatar();
    this.sessionStorageService.removeItemFromSessionStorage(this.AVATAR_IMG_KEY);
  }

  clearAvatar(): void {
    this.changeUserAvatar(new AvatarImage());  // Empty AvatarImage
  }

  triggerGetAvatarImage(): void {
    let avatarImageFromSession: AvatarImage = this.getAvatarImageFromSessionStorage();

    if (!isNullOrUndefined(avatarImageFromSession)) {
      this.changeUserAvatar(avatarImageFromSession);
    } else {
      this.getAvatarImageFromServer()
        .subscribe(
          (data: AvatarImage) => {
            this.changeUserAvatar(data);
          },
          () => {
            let emptyAvatar: AvatarImage = new AvatarImage();
            this.changeUserAvatar(emptyAvatar);
          }
        );
    }
  }

  private getAvatarImageFromServer(): Observable<AvatarImage> {
    let umsLimitedProfile: UmsLimitedProfile = this.limitedProfileService.getProfileFromSessionStorage();

    if (!isNullOrUndefined(umsLimitedProfile)) {
      const GET_AVATAR_URL: string = this.umsUserAvatarUrl.concat("/user/" + umsLimitedProfile.userId + "/avatar");

      return this.http.get(GET_AVATAR_URL)
        .map((resp: Response) => <AvatarImage>(resp.json()))
        .catch(this.exceptionService.handleErrorWithErrorCode);
    }
  }

  private setAvatarImageInSessionStorage(avatarImage: AvatarImage): void {
    this.sessionStorageService.setItemInSessionStorage(this.AVATAR_IMG_KEY, avatarImage);
  }
}
