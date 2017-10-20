import {NgModule} from "@angular/core";
import {NgUploaderModule} from "ngx-uploader";
import {userProfileRoutedComponents, UserProfileRoutingModule} from "./user-profile-routing.module";
import {SharedModule} from 'c2s-ng-shared';
import {LayoutModule} from "../layout/layout.module";
import {ProfileFieldsLookupService} from "./shared/profile-fields-lookup.service";
import {FullProfileService} from "./shared/full-profile.service";
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
  providers: [
    ProfileFieldsLookupService,
    FullProfileService
  ]
})
export class UserProfileModule {
}
