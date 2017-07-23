import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {ExceptionService} from "../../core/exception.service";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {UtilityService} from "../../shared/utility.service";
import {AvatarFileUploadRequest} from "./avatar-file-upload-request.model";
import {FullProfileService} from "../../shared/full-profile.service";
import {Observable} from "rxjs/Observable";
import {AvatarImage} from "./avatar-image.model";

@Injectable()
export class UserAvatarService {
  private umsUserUrl: string = this.c2sUiApiUrlService.getUmsBaseUrl().concat("/user-avatars");

  constructor(private c2sUiApiUrlService: C2sUiApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http,
              private fullProfileService: FullProfileService) {
  }

  public saveUserAvatar(avatarFileUploadRequest: AvatarFileUploadRequest): Observable<AvatarImage> {
    return this.getCurrentUserId()
      .flatMap(userId => {
        const UPLOAD_AVATAR_URL: string = this.umsUserUrl.concat("/user/" + userId + "/avatar");

        return this.http.post(UPLOAD_AVATAR_URL, avatarFileUploadRequest)
          .map((resp: Response) => <AvatarImage>(resp.json()))
          .catch(this.exceptionService.handleErrorWithErrorCode);
      })
      .catch(this.exceptionService.handleErrorWithErrorCode);
  }

  public static buildAvatarFileUploadRequest(imgSrc: string, croppedImageFile: File, croppedImgHeight: number, croppedImgWidth: number): AvatarFileUploadRequest {
    let avatarFileUploadRequest = new AvatarFileUploadRequest();

    avatarFileUploadRequest.fileName = croppedImageFile.name;
    avatarFileUploadRequest.fileExtension = UtilityService.extractExtensionFromFileName(croppedImageFile.name);
    avatarFileUploadRequest.fileContents = UtilityService.stringToBase64(imgSrc);
    avatarFileUploadRequest.fileSizeBytes = croppedImageFile.size;

    return avatarFileUploadRequest;
  }

  private getCurrentUserId(): Observable<number> {
    return this.fullProfileService.getUMSFullProfile()
      .map(fullProfile => fullProfile.userId);
  }
}
