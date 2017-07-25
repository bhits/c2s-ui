import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import {Http, Response, RequestOptions, Headers, URLSearchParams} from "@angular/http";

import {GlobalEventManagerService} from "../../core/global-event-manager.service";
import {AccessToken} from "./access-token.model";
import {TokenService} from "./token.service";
import {Profile} from "../../core/profile.model";
import {LimitedProfileService} from "./limited-profile.service";
import {UmsLimitedProfile} from "./ums-limited-profile.model";
import {CustomTranslateService} from "../../core/custom-translate.service";
import {UtilityService} from "../../shared/utility.service";


@Injectable()
export class AuthenticationService {
  oauth2TokenUrl: string = "/uaa/oauth/token/";
  oauth2UserInfoUrl: string = "/uaa/userinfo";
  CLIENT_ID:string = 'YzJzLXVpOmNoYW5nZWl0';
  HOME:string ='home';
  LOGIN:string ='login';

  constructor(private router: Router,
              private http: Http,
              private tokenService: TokenService,
              private globalEventManagerService: GlobalEventManagerService,
              private limitedProfileService: LimitedProfileService,
              private customTranslateService: CustomTranslateService,
              private utilityService: UtilityService) {
  }

  login(username:string, password:string) {
    return this.http.post(this.oauth2TokenUrl, this.composeParameters(username, password), this.setHeaders());
  }

  onLoginSuccess(response: Response){
    this.tokenService.setAccessToken(response);
  }

  logout() {
    this.tokenService.deleteAccessToken();
    this.tokenService.deleteProfileToken();
    this.tokenService.deleteProviderCount();
    this.limitedProfileService.deleteProfileFromSessionStorage();
    this.globalEventManagerService.setShowHeader(false);
    this.goToLogin();
  }

  private goToLogin(){
    let masterUiLoginUrl = this.tokenService.getMasterUiLoginUrl();
    if(masterUiLoginUrl){
      this.tokenService.deleteMasterUiLoginUrl();
      this.utilityService.redirectInSameTab(masterUiLoginUrl);
    }else{
      this.router.navigate([this.LOGIN]);
    }
  }

  isLogin(){
    const C2S_UI_ACCESS_SCOPE: string = "c2sUi.access";
    let oauth2Token:AccessToken =  this.tokenService.getAccessToken();
    let profile:Profile =  this.tokenService.getProfileToken();

    if(oauth2Token && this.tokenService.hasScope(C2S_UI_ACCESS_SCOPE) && profile){
        let umsProfile:UmsLimitedProfile =  this.limitedProfileService.getProfileFromSessionStorage();
        if(umsProfile){
          this.customTranslateService.addSupportedLanguages(this.utilityService.getSupportedLocaleCode(umsProfile.supportedLocales));
          this.customTranslateService.setDefaultLanguage(umsProfile.userLocale);
        }
        this.globalEventManagerService.setShowHeader(true);
        this.globalEventManagerService.setProfile(profile);
        return true;
    }
    return false;
  }

  getUserProfile(){
    return this.http.get(this.oauth2UserInfoUrl)
                      .map((resp: Response) => <any>(resp.json()));
  }

  onGetUserProfileSuccess(profile:Profile){
    this.globalEventManagerService.setShowHeader(true);
    this.globalEventManagerService.setProfile(profile);
    this.router.navigate([this.HOME]);
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
