import {NgModule} from "@angular/core";
import {NgUploaderModule} from "ngx-uploader";
import {userAvatarRoutedComponents, UserAvatarRoutingModule} from "./user-avatar-routing.module";
import {SharedModule} from 'c2s-ng-shared';

import {TranslateModule} from "@ngx-translate/core";
import {ImageCropperModule} from "ng2-image-cropper";
import {UserAvatarService} from "./shared/user-avatar.service";
import {FullProfileService} from "../user-profile/shared/full-profile.service";
import {UserAvatarDisplayComponent} from "./user-avatar-display/user-avatar-display.component";

@NgModule({
  imports: [
    ImageCropperModule,
    NgUploaderModule,
    SharedModule,
    UserAvatarRoutingModule,
    TranslateModule
  ],
  declarations: [
    userAvatarRoutedComponents,
    UserAvatarDisplayComponent
  ],
  exports: [UserAvatarDisplayComponent],
  providers: [
    UserAvatarService,
    FullProfileService
  ]
})
export class UserAvatarModule {
}
