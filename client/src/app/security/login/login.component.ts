import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../shared/authentication.service";
import {Credentials} from "../shared/credentials.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../shared/token.service";
import {CustomTranslateService} from "../../core/custom-translate.service";
import {LimitedProfileService} from "../shared/limited-profile.service";
import {UmsLimitedProfile} from "../shared/ums-limited-profile.model";
import {Profile} from "../../core/profile.model";
import {UtilityService} from "../../shared/utility.service";

@Component({
  selector: 'c2s-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public passwordInputType: string = "password";
  credentials: Credentials;
  loginForm: FormGroup;
  showLoginBackendError: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private customTranslateService: CustomTranslateService,
              private limitedProfileService: LimitedProfileService,
              private utilityService: UtilityService) {

    this.credentials = new Credentials();
    this.loginForm = formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  public login(value: any): void {
    this.authenticationService.login(value.username, value.password)
      .subscribe(
        (response) => {
          this.showLoginBackendError = false;
          this.authenticationService.onLoginSuccess(response);
          this.authenticationService.getUserProfile()
            .subscribe(
              (uaaProfile) => {
                let profile = this.tokenService.createProfileObject(uaaProfile);
                this.tokenService.storeUserProfile(profile);
                this.getUMSProfileAndSetDefaultLanguage(profile);
              },
              () => this.authenticationService.onGetUserProfileFailure()
            );
        },
        () => {
          this.showLoginBackendError = true;
        }
      );
  }

  private getUMSProfileAndSetDefaultLanguage(uaaProfile: Profile): void {
    this.limitedProfileService.getUMSProfile().subscribe(
      (profile: UmsLimitedProfile) => {
        let localesCode: string[] = this.utilityService.getSupportedLocaleCode(profile.supportedLocales);
        this.customTranslateService.addSupportedLanguages(localesCode);
        this.customTranslateService.setDefaultLanguage(profile.userLocale);
        this.limitedProfileService.setProfileInSessionStorage(profile);
        this.authenticationService.onGetUserProfileSuccess(uaaProfile);
      },
      () => this.authenticationService.onGetUserProfileFailure()
    )
  }

  public getInputType(inputType: string): void {
    this.passwordInputType = inputType;
  }
}
