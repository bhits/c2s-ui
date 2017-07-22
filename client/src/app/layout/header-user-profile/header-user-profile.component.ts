import {Component, OnInit} from '@angular/core';
import {LimitedProfileService} from "../../security/shared/limited-profile.service";
import {UtilityService} from "../../shared/utility.service";
import {AvatarImage} from "../../user-avatar/shared/avatar-image.model";
import {UserAvatarMonitoringService} from "../../shared/user-avatar-monitoring.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'c2s-header-user-profile',
  templateUrl: './header-user-profile.component.html',
  styleUrls: ['header-user-profile.component.scss']
})
export class HeaderUserProfileComponent implements OnInit {
  private DEFAULT_AVATAR_IMG_URI: string = "assets/img/generic-avatar-sm-48.png";

  avatarImgDataUri: string;
  userName: String;

  constructor(private limitedProfileService: LimitedProfileService,
              private userAvatarMonitoringService: UserAvatarMonitoringService) {
    this.avatarImgDataUri = this.DEFAULT_AVATAR_IMG_URI;

    this.userAvatarMonitoringService.userAvatarSource
      .subscribe(
        (currentAvatar: AvatarImage) => {
          if ((!isNullOrUndefined(currentAvatar)) && (!isNullOrUndefined(currentAvatar.fileContents))) {
            this.avatarImgDataUri = UtilityService.base64ToString(currentAvatar.fileContents);
          } else {
            this.avatarImgDataUri = this.DEFAULT_AVATAR_IMG_URI;
          }
        },
        () => {
          this.avatarImgDataUri = this.DEFAULT_AVATAR_IMG_URI;
        });
  }

  ngOnInit() {
    this.userAvatarMonitoringService.triggerGetAvatarImage();
    this.userName = this.limitedProfileService.getFullName();
  }
}
