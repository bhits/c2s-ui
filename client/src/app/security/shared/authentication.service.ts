import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import {GlobalEventManagerService} from "./global-event-manager.service";

@Injectable()
export class AuthenticationService {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private globalEventManagerService: GlobalEventManagerService) {
  }

  login(username:string, password:string) {

    this.isLoggedIn = true;
    sessionStorage.setItem('c2s-isLoggedIn',JSON.stringify(this.isLoggedIn) );

    this.globalEventManagerService.setShowHeaderAndFooter(this.isLoggedIn);
    this.router.navigate(['home']);
  }

  logout() {
    sessionStorage.removeItem('c2s-isLoggedIn');
    this.isLoggedIn = false;
    this.globalEventManagerService.setShowHeaderAndFooter(this.isLoggedIn);
    this.router.navigate(['login']);
  }

  isLogin(){
    let login: boolean = JSON.parse(sessionStorage.getItem('c2s-isLoggedIn'));
    if(login){
        this.globalEventManagerService.setShowHeaderAndFooter(login);
        return true;
    }
    return false;
  }

}
