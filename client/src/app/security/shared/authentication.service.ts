import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import {GlobalEventManagerService} from "./global-event-manager.service";

@Injectable()
export class AuthenticationService {
  isLoggedIn: boolean = false;

  constructor(private router: Router,
              private globalEventManagerService: GlobalEventManagerService) {
  }

  login(username:string, password:string) {

    this.isLoggedIn = true;
    this.setItemInSessionStorage('c2s-isLoggedIn', this.isLoggedIn);

    this.globalEventManagerService.setShowHeaderAndFooter(this.isLoggedIn);
    this.router.navigate(['home']);
  }

  logout() {
    this.removeItemFromSessionStorage('c2s-isLoggedIn');
    this.isLoggedIn = false;
    this.globalEventManagerService.setShowHeaderAndFooter(this.isLoggedIn);
    this.router.navigate(['login']);
  }

  isLogin(){
    let login: boolean = this.getItemFromSessionStorage('c2s-isLoggedIn');
    if(login){
        this.globalEventManagerService.setShowHeaderAndFooter(login);
        return true;
    }
    return false;
  }

  setItemInSessionStorage(key:string, value:any){
    sessionStorage.setItem(key,JSON.stringify(value) );
  }

  getItemFromSessionStorage(key:string):any{
    return JSON.parse(sessionStorage.getItem(key));
  }

  removeItemFromSessionStorage(key:string):void{
    sessionStorage.removeItem(key);
  }
}
