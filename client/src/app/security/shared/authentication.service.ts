import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Router, RouterStateSnapshot} from "@angular/router";

import {GlobalEventManagerService} from "./global-event-manager.service";

@Injectable()
export class AuthenticationService {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private globalEventManagerService: GlobalEventManagerService) { }

  login() {
    this.toggleLogState(true);
    this.globalEventManagerService.setShowHeaderAndFooter(true);
    this.router.navigate(['home']);
  }

  logout() {
    this.toggleLogState(false);
    this.globalEventManagerService.setShowHeaderAndFooter(false);
    this.router.navigate(['login']);
  }

  private toggleLogState(val: boolean) {
    this.isLoggedIn = val;
  }

}
