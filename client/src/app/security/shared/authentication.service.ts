import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {GlobalEventManagerService} from "../../core/global-event-manager.service";
import {TokenService} from "./token.service";
import {Profile} from "../../core/profile.model";
import {LimitedProfileService} from "./limited-profile.service";
import {UmsLimitedProfile} from "./ums-limited-profile.model";
import {CustomTranslateService} from "../../core/custom-translate.service";
import {UtilityService} from "../../shared/utility.service";
import {Observable} from "rxjs/Observable";
import {ExceptionService} from "../../core/exception.service";
import {AuthorizationResponse} from "./authorization-response.model";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {LoginRequest} from "./login-request.model";


@Injectable()
export class AuthenticationService {
  oauth2UserInfoUrl: string = "/uaa/userinfo";
  private ACCOUNT_LOCKED_MESSAGE:string = "Your account has been locked because of too many failed attempts to login.";
  private BAD_CREDENTIAL_MESSAGE = "Bad credential Exception.";

  constructor(private apiUrlService: C2sUiApiUrlService,
              private http: Http,
              private tokenService: TokenService,
              private globalEventManagerService: GlobalEventManagerService,
              private limitedProfileService: LimitedProfileService,
              private customTranslateService: CustomTranslateService,
              private utilityService: UtilityService) {
  }

  public login(username: string, password: string): Observable<AuthorizationResponse> {
    return this.http.post(this.apiUrlService.getUaaBaseUrl().concat("/login"), new LoginRequest(username, password))
      .map((resp: Response) => <AuthorizationResponse>(resp.json()));
  }

  public onLoginSuccess(response: AuthorizationResponse): void {
    this.tokenService.setAccessToken(response);
  }

  public onGetUserProfileFailure(): void {
    this.globalEventManagerService.setShowHeader(false);
    this.tokenService.deleteAccessToken();
    this.tokenService.deleteProfileToken();
  }

  public logout(): void {
    this.globalEventManagerService.setShowHeader(false);
    this.clearSessionStorageAndRedirectToLogin();
  }

  private clearSessionStorageAndRedirectToLogin() {
    let masterUiLoginUrl = this.tokenService.getMasterUiLoginUrl();
    sessionStorage.clear();
    if (masterUiLoginUrl) {
      this.utilityService.redirectInSameTab(masterUiLoginUrl);
    } else {
      this.utilityService.navigateTo(this.apiUrlService.getLoginUrl());
    }
  }

  public isLogin(): boolean {
    let oauth2Token: AuthorizationResponse = this.tokenService.getAccessToken();
    let profile: Profile = this.tokenService.getProfileToken();

    if (oauth2Token && profile) {
      let umsProfile: UmsLimitedProfile = this.limitedProfileService.getProfileFromSessionStorage();
      if (umsProfile) {
        this.customTranslateService.addSupportedLanguages(this.utilityService.getSupportedLocaleCode(umsProfile.supportedLocales));
        this.customTranslateService.setDefaultLanguage(umsProfile.userLocale);
      }
      this.globalEventManagerService.setShowHeader(true);
      this.globalEventManagerService.setProfile(profile);
      return true;
    }
    return false;
  }

  public getUserProfile() {
    return this.http.get(this.oauth2UserInfoUrl)
      .map((resp: Response) => <any>(resp.json()));
  }

  public onGetUserProfileSuccess(profile: Profile): void {
    this.globalEventManagerService.setProfile(profile);
    this.utilityService.navigateTo(this.apiUrlService.getHomeUrl());
  }

  isAccountLocked(msg: string): boolean {
    return msg === this.ACCOUNT_LOCKED_MESSAGE;
  }

  isBadCredendials(msg: string): boolean {
    return msg === this.BAD_CREDENTIAL_MESSAGE;
  }
}
