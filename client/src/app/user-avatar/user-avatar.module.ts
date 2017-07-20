import {NgModule} from "@angular/core";
import {NgUploaderModule} from "ngx-uploader";
import {UserAvatarRoutingModule, userAvatarRoutedComponents} from "./user-avatar-routing.module";
import {SharedModule} from "../shared/shared.module";
import {LayoutModule} from "../layout/layout.module";

import {TranslateModule} from "@ngx-translate/core";
import {ExceptionService} from "../shared/exception.service";
import {ImageCropperComponent} from "ng2-image-cropper";

@NgModule({
  imports: [
    NgUploaderModule,
    SharedModule,
    LayoutModule,
    UserAvatarRoutingModule,
    TranslateModule
  ],
  declarations: [
    ImageCropperComponent,
    userAvatarRoutedComponents
  ],
  providers: [
    ExceptionService
  ]
})
export class UserAvatarModule {
}
