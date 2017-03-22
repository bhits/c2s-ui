import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class CanActivateAuthGuardService implements CanActivate, CanActivateChild{

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(next, state);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isLogin()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
