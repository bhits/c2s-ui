import {NgModule} from "@angular/core";
import {NgUploaderModule} from "ngx-uploader";
import {UserAvatarRoutingModule, userAvatarRoutedComponents} from "./user-avatar-routing.module";
import {SharedModule} from "../shared/shared.module";
import {LayoutModule} from "../layout/layout.module";

import {TranslateModule} from "@ngx-translate/core";
import {ExceptionService} from "../shared/exception.service";
import {ImageCropperModule} from "ng2-image-cropper";
import {UserAvatarService} from "./shared/user-avatar.service";
import {FullProfileService} from "../shared/full-profile.service";

@NgModule({
  imports: [
    ImageCropperModule,
    NgUploaderModule,
    SharedModule,
    LayoutModule,
    UserAvatarRoutingModule,
    TranslateModule
  ],
  declarations: [
    userAvatarRoutedComponents
  ],
  providers: [
    UserAvatarService,
    FullProfileService,
    ExceptionService
  ]
})
export class UserAvatarModule {
}
