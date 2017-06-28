import {NgModule} from "@angular/core";
import {NgUploaderModule} from "ngx-uploader";
import {UserProfileRoutingModule, userProfileRoutedComponents} from "./user-profile-routing.module";
import {SharedModule} from "../shared/shared.module";
import {LayoutModule} from "../layout/layout.module";

import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    NgUploaderModule,
    SharedModule,
    LayoutModule,
    UserProfileRoutingModule,
    TranslateModule
  ],
  declarations: [
    userProfileRoutedComponents
  ],
  providers: []
})
export class UserProfileModule {
}
