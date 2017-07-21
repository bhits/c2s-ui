import {Component, OnInit} from '@angular/core';
import {LimitedProfileService} from "../../security/shared/limited-profile.service";
import {UtilityService} from "../../shared/utility.service";

@Component({
  selector: 'c2s-header-user-profile',
  templateUrl: './header-user-profile.component.html',
  styleUrls: ['header-user-profile.component.scss']
})
export class HeaderUserProfileComponent implements OnInit {
  avatarImgDataUri: string;
  userName: String;

  constructor(private limitedProfileService: LimitedProfileService) {
    this.avatarImgDataUri = "";
  }

  ngOnInit() {
    this.userName = this.limitedProfileService.getFullName();
    this.limitedProfileService.getAvatarImage()
      .subscribe(
        (data) => {
          this.avatarImgDataUri = UtilityService.base64ToString(data.fileContents);
        },
        (err) => {
          console.log(err);
          // FIXME: Display i18n error message via notificationService
        }
      );
  }
}
