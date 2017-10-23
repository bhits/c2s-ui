import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {securityRoutableComponents, SecurityRoutingModule} from "./security-routing.module";
import {AuthenticationService} from "./shared/authentication.service";
import {CanActivateAuthGuardService} from "./shared/can-activate-auth-guard.service";
import {SharedModule} from 'c2s-ng-shared';
import {SessionStorageService} from "./shared/session-storage.service";
import {TokenService} from "./shared/token.service";
import {LimitedProfileService} from "./shared/limited-profile.service";
import {LayoutModule} from "../layout/layout.module";
import {CanActivateHealthInformationService} from "../health-information/shared/can-activate-health-information.service";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    SecurityRoutingModule,
    TranslateModule
  ],
  declarations: [
    securityRoutableComponents,
  ],
  providers: [
    CanActivateAuthGuardService,
    CanActivateHealthInformationService,
    AuthenticationService,
    SessionStorageService,
    TokenService,
    LimitedProfileService
  ]
})
export class SecurityModule {
}
