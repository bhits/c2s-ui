import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import {Http, Response, RequestOptions, Headers, URLSearchParams} from "@angular/http";

import {GlobalEventManagerService} from "../../core/global-event-manager.service";
import {AccessToken} from "./access-token.model";
import {TokenService} from "./token.service";
import {Profile} from "../../core/profile.model";
import {ProfileService} from "./profile.service";
import {UmsProfile} from "./ums-profile.model";
import {CustomTranslateService} from "../../core/custom-translate.service";


@Injectable()
export class AuthenticationService {
  uaaTokenUrl: string = "/uaa/oauth/token/";
  uaaUserInfoUrl: string = "/uaa/userinfo";
  CLIENT_ID:string = 'YzJzLXVpOmNoYW5nZWl0';
  HOME:string ='home';
  LOGIN:string ='login';

  constructor(private router: Router,
              private http: Http,
              private tokenService: TokenService,
              private globalEventManagerService: GlobalEventManagerService,
              private profileService: ProfileService,
              private customTranslateService: CustomTranslateService) {
  }

  login(username:string, password:string) {
    return this.http.post(this.uaaTokenUrl, this.composeParameters(username, password), this.setHeaders());
  }

  onLoginSuccess(response: Response){
    this.tokenService.setAccessToken(response);
  }

  logout() {
    this.tokenService.deleteAccessToken();
    this.tokenService.deleteProfileToken();
    this.profileService.deleteProfileFromSessionStorage();
    this.globalEventManagerService.setShowHeaderAndFooter(false);
    this.router.navigate([this.LOGIN]);
  }

  isLogin(){
    let uaaToken:AccessToken =  this.tokenService.getAccessToken();
    let profile:Profile =  this.tokenService.getProfileToken();

    if(uaaToken && profile){
        let usmProfile:UmsProfile =  this.profileService.getProfileFromSessionStorage();
        if(usmProfile){
          this.customTranslateService.addSupportedLanguages(usmProfile.locales);
          this.customTranslateService.setDefaultLanguage(usmProfile.defaultLocale);
        }

        this.globalEventManagerService.setShowHeaderAndFooter(true);
        this.globalEventManagerService.setProfile(profile);

        return true;
    }
    return false;
  }

  getUserProfile(){
    return this.http.get(this.uaaUserInfoUrl)
                      .map((resp: Response) => <any>(resp.json()));
  }

  onGetUserProfileSuccess(profile:Profile){
    this.globalEventManagerService.setShowHeaderAndFooter(true);
    this.globalEventManagerService.setProfile(profile);
    this.router.navigate([this.HOME]);
  }

  onGetUserProfileError(){
    this.tokenService.deleteAccessToken();
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
