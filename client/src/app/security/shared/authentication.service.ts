import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import {Http, Response, RequestOptions, Headers, URLSearchParams} from "@angular/http";

import {GlobalEventManagerService} from "./global-event-manager.service";
import {UaaToken} from "./uaa-token";
import {TokenService} from "./token.service";
import {ExceptionService} from "../../core/exception.service";


@Injectable()
export class AuthenticationService {
  uaaTokenUrl: string = "/uaa/oauth/token/";
  uaaAccessTokenUrl: string = "/uaa/userinfo";
  CLIENT_ID:string = 'YzJzLXVpOmNoYW5nZWl0';
  HOME:string ='home';
  LOGIN:string ='login';

  constructor(private router: Router,
              private http: Http,
              private tokenService: TokenService,
              private exceptionService: ExceptionService,
              private globalEventManagerService: GlobalEventManagerService) {
  }

  login(username:string, password:string) {
    return this.http.post(this.uaaTokenUrl, this.composeParameters(username, password), this.setHeaders());
  }

  handleLoginSuccess(response: Response){
    this.tokenService.setToken(response);
    this.globalEventManagerService.setShowHeaderAndFooter(true);
    // this.getAccessToken();
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

  getAccessToken() {
    return this.http.get(this.uaaAccessTokenUrl)
                      .map((resp: Response) => {
                          console.log(<any>(resp.json()));
                      })
                      .catch(this.exceptionService.handleError);;
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
