import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

import {AuthenticationService} from "./authentication.service";
import {TokenService} from "./token.service";
import {NotificationService} from "../../core/notification.service";
import {UtilityService} from "../../shared/utility.service";

@Injectable()
export class CanActivateAuthGuardService implements CanActivate, CanActivateChild{
  private CONSENT_CREATE_EDIT_URL:string = "consent-create-edit";

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
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
      if(next.url.toString() === this.CONSENT_CREATE_EDIT_URL){
        let providerCount: number = this.tokenService.getProviderCount();
        if( providerCount<= 1){
          this.notificationService.show("You don't have enough providers to create consent.");
          this.utilityService.navigateTo("consent-list");
        }
      }
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
