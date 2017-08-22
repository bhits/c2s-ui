import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from "@angular/router";

import {AuthenticationService} from "./authentication.service";
import {TokenService} from "./token.service";
import {NotificationService} from "../../core/notification.service";
import {UtilityService} from "../../shared/utility.service";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";

@Injectable()
export class CanActivateAuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authenticationService: AuthenticationService,
              private apiUrlService: C2sUiApiUrlService,
              private tokenService: TokenService,
              private notificationService: NotificationService,
              private utilityService: UtilityService) {
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(next, state);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isLogin()) {
      /**
       * Prevent user from viewing consent list if they don't
       * have the required number of providers
       */
      if (next.url.toString() === this.apiUrlService.getConsentCreateEditUrl()) {
        let providerCount: number = this.tokenService.getProviderCount();
        if (providerCount <= 1) {
          this.notificationService.show("You don't have enough providers to create consent.");
          this.utilityService.navigateTo(this.apiUrlService.getConsentListUrl());
        }
      }
      return true;
    }
    this.utilityService.navigateTo(this.apiUrlService.getLoginUrl());
    return false;
  }
}
