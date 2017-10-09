import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {GlobalEventManagerService} from "../../core/global-event-manager.service";
import {TokenService} from "./token.service";
import {LimitedProfileService} from "./limited-profile.service";
import {UmsLimitedProfile} from "./ums-limited-profile.model";
import {CustomTranslateService} from "../../core/custom-translate.service";
import {UtilityService} from "../../core/utility.service";
import {Observable} from "rxjs/Observable";
import {AuthorizationResponse} from "./authorization-response.model";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {LoginRequest} from "./login-request.model";
import {ConfigService} from "../../core/config.service";
import {Config} from "../../core/config.model";
import {NotificationService} from "../../core/notification.service";


@Injectable()
export class AuthenticationService {
  private ACCOUNT_LOCKED_MESSAGE: string = "Your account has been locked because of too many failed attempts to login.";
  private BAD_CREDENTIAL_MESSAGE = "Bad credential Exception.";

  constructor(private apiUrlService: C2sUiApiUrlService,
              private http: Http,
              private tokenService: TokenService,
              private globalEventManagerService: GlobalEventManagerService,
              private limitedProfileService: LimitedProfileService,
              private customTranslateService: CustomTranslateService,
              private utilityService: UtilityService,
              private configService: ConfigService,
              private notificationService: NotificationService) {
  }

  public login(username: string, password: string): Observable<AuthorizationResponse> {
    return this.http.post(this.apiUrlService.getUaaBaseUrl().concat("/login"), new LoginRequest(username, password))
      .map((resp: Response) => <AuthorizationResponse>(resp.json()));
  }

  public onLoginSuccess(response: AuthorizationResponse): void {
    this.tokenService.setAccessToken(response);

    // Get config data once login
    this.configService.getConfig().subscribe(
      (config: Config) => {
        this.configService.setConfigInSessionStorage(config);
      },
      () => {
        this.notificationService.i18nShow("SHARED.CONFIGURATION_SERVICE_ERROR");
      }
    );
  }

  public onGetUserProfileSuccess(redirectUrl: string): void {
    if (redirectUrl != null) {
      this.utilityService.navigateTo(redirectUrl);
    } else {
      this.utilityService.navigateTo(this.apiUrlService.getHomeUrl());
    }
  }

  public onGetUserProfileFailure(): void {
    this.globalEventManagerService.setShowHeader(false);
    this.tokenService.deleteAccessToken();
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

    if (oauth2Token != null) {
      let umsProfile: UmsLimitedProfile = this.limitedProfileService.getProfileFromSessionStorage();
      if (umsProfile != null) {
        this.customTranslateService.addSupportedLanguages(this.utilityService.getSupportedLocaleCode(umsProfile.supportedLocales));
        this.customTranslateService.setDefaultLanguage(umsProfile.userLocale);
      }
      this.globalEventManagerService.setShowHeader(true);
      return true;
    } else {
      this.tokenService.deleteAccessToken();
      return false;
    }
  }

  public isAccountLocked(msg: string): boolean {
    return msg === this.ACCOUNT_LOCKED_MESSAGE;
  }

  public isBadCredentials(msg: string): boolean {
    return msg === this.BAD_CREDENTIAL_MESSAGE;
  }
}
