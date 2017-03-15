import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import {Http, Response, RequestOptions, Headers, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";

import {GlobalEventManagerService} from "./global-event-manager.service";
import {UaaToken} from "./uaa-token";


@Injectable()
export class AuthenticationService {
  private uaaTokenUrl: string = "/uaa/oauth/token/";
  private CLIENT_ID:string = 'YzJzLXVpOmNoYW5nZWl0';
  constructor(private router: Router,
              private http: Http,
              private globalEventManagerService: GlobalEventManagerService) {
  }

  login(username:string, password:string) {
    return this.http.post(this.uaaTokenUrl, this.composeParameters(username, password), this.setHeaders());
  }

  handleLoginSuccess(response: Response){
    this.setItemInSessionStorage('c2s-uaa-token', this.createTokenObject(response.json()));
    this.globalEventManagerService.setShowHeaderAndFooter(true);
    this.router.navigate(['home']);
  }

  logout() {
    this.removeItemFromSessionStorage('c2s-uaa-token');
    this.globalEventManagerService.setShowHeaderAndFooter(false);
    this.router.navigate(['login']);
  }

  isLogin(){
    let uaaToken:UaaToken = this.getItemFromSessionStorage('c2s-uaa-token');
    if(uaaToken){
        this.globalEventManagerService.setShowHeaderAndFooter(true);
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
  private createTokenObject(token:any): UaaToken{
    let uaaToken = new UaaToken();
    uaaToken.accessToken = token.access_token;
    uaaToken.exspiresIn = token.expires_in;
    uaaToken.jti = token.jti;
    uaaToken.refreshToken = token.refresh_token;
    uaaToken.scope = token.scope;
    uaaToken.tokenType = token.token_type;

    return token;
  }
}
