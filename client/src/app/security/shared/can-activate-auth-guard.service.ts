import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";

import {AuthenticationService} from "./authentication.service";
import {TokenService} from "./token.service";
import {NotificationService} from "../../core/notification.service";
import {UtilityService} from "../../shared/utility.service";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {PlatformLocation} from "@angular/common";
import {GlobalEventManagerService} from "../../core/global-event-manager.service";

@Injectable()
export class CanActivateAuthGuardService implements CanActivate, CanActivateChild {
  private LOGIN_PATH: string = "/c2s-ui/login";

  constructor(private authenticationService: AuthenticationService,
              private apiUrlService: C2sUiApiUrlService,
              private tokenService: TokenService,
              private notificationService: NotificationService,
              private router: Router,
              private utilityService: UtilityService,
              private location: PlatformLocation,
              private globalEventManagerService: GlobalEventManagerService) {
    location.onPopState(() => {
      if(window.location.pathname === this.LOGIN_PATH){
        this.globalEventManagerService.setShowHeader(false);
        sessionStorage.clear();
      }
    });
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
    this.router.navigate([this.apiUrlService.getLoginUrl()], {queryParams: {redirectUrl: state.url}});
    return false;
  }
}
