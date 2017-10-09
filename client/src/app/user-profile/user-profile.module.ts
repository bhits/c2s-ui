import {NgModule} from "@angular/core";
import {NgUploaderModule} from "ngx-uploader";
import {userProfileRoutedComponents, UserProfileRoutingModule} from "./user-profile-routing.module";
import {SharedModule} from "../shared/shared.module";
import {LayoutModule} from "../layout/layout.module";
import {ProfileFieldsLookupService} from "./shared/profile-fields-lookup.service";
import {FullProfileService} from "./shared/full-profile.service";

@NgModule({
  imports: [
    NgUploaderModule,
    SharedModule,
    LayoutModule,
    UserProfileRoutingModule
  ],
  declarations: [
    userProfileRoutedComponents
  ],
  providers: [
    ProfileFieldsLookupService,
    FullProfileService
  ]
})
export class UserProfileModule {
}
