import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {securityRoutableComponents, SecurityRoutingModule} from "./security-routing.module";
import {AuthenticationService} from "./shared/authentication.service";
import {CanActivateAuthGuardService} from "./shared/can-activate-auth-guard.service";
import {SharedModule} from "../shared/shared.module";
import {SessionStorageService} from "./shared/session-storage.service";
import {TokenService} from "./shared/token.service";
import {LimitedProfileService} from "./shared/limited-profile.service";
import {LayoutModule} from "../layout/layout.module";

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    SecurityRoutingModule
  ],
  declarations: [
    securityRoutableComponents,
  ],
  providers: [
    CanActivateAuthGuardService,
    AuthenticationService,
    SessionStorageService,
    TokenService,
    LimitedProfileService
  ]
})
export class SecurityModule {
}
