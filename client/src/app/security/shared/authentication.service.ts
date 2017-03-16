import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import {Http, Response, RequestOptions, Headers, URLSearchParams} from "@angular/http";

import {GlobalEventManagerService} from "./global-event-manager.service";
import {UaaToken} from "./uaa-token";
import {TokenService} from "./token.service";


@Injectable()
export class AuthenticationService {
  uaaTokenUrl: string = "/uaa/oauth/token/";
  CLIENT_ID:string = 'YzJzLXVpOmNoYW5nZWl0';
  HOME:string ='home';
  LOGIN:string ='login';

  constructor(private router: Router,
              private http: Http,
              private tokenService: TokenService,
              private globalEventManagerService: GlobalEventManagerService) {
  }

  login(username:string, password:string) {
    return this.http.post(this.uaaTokenUrl, this.composeParameters(username, password), this.setHeaders());
  }

  handleLoginSuccess(response: Response){
    this.tokenService.setToken(response);
    this.globalEventManagerService.setShowHeaderAndFooter(true);
    this.router.navigate([this.HOME]);
  }

  logout() {
    this.tokenService.deleteToken();
    this.globalEventManagerService.setShowHeaderAndFooter(false);
    this.router.navigate([this.LOGIN]);
  }

  isLogin(){
    let uaaToken:UaaToken =  this.tokenService.getToken();
    if(uaaToken){
        this.globalEventManagerService.setShowHeaderAndFooter(true);
        return true;
    }
    return false;
  }


  private setHeaders():RequestOptions {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': 'Basic ' + this.CLIENT_ID } );
    return new RequestOptions({ headers: headers });
  }

  private composeParameters(username: string, password:string): string{
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password);
    urlSearchParams.append('grant_type', 'password');
    urlSearchParams.append('response_type', 'token');

    return urlSearchParams.toString()
  }
}
