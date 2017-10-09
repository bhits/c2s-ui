import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";
import {Credentials} from "../shared/credentials.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomTranslateService} from "../../core/custom-translate.service";
import {LimitedProfileService} from "../shared/limited-profile.service";
import {UmsLimitedProfile} from "../shared/ums-limited-profile.model";
import {UtilityService} from "../../core/utility.service";

@Component({
  selector: 'c2s-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  private redirectUrl: string;
  public passwordInputType: string = "password";
  credentials: Credentials;
  loginForm: FormGroup;
  showBadCredentialError: boolean = false;
  showAccountLockedError: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private customTranslateService: CustomTranslateService,
              private limitedProfileService: LimitedProfileService,
              private route: ActivatedRoute,
              private utilityService: UtilityService) {

    this.credentials = new Credentials();
    this.loginForm = formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  ngOnInit() {
    // get redirect url from route parameters
    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'];
  }

  public login(value: any): void {
    this.authenticationService.login(value.username, value.password)
      .subscribe(
        (response) => {
          this.showBadCredentialError = false;
          this.showAccountLockedError = false;
          this.authenticationService.onLoginSuccess(response);
          this.getUMSProfileAndSetDefaultLanguage();
        },
        (error) => {
          let message: string = error.json()['message'];
          if (this.authenticationService.isAccountLocked(message)) {
            this.showAccountLockedError = true;
            this.showBadCredentialError = false;
            console.log(message);
          } else if (this.authenticationService.isBadCredentials(message)) {
            this.showBadCredentialError = true;
            this.showAccountLockedError = false;
            console.log(message);
          }
        }
      );
  }

  private getUMSProfileAndSetDefaultLanguage(): void {
    this.limitedProfileService.getUMSProfile().subscribe(
      (profile: UmsLimitedProfile) => {
        let localesCode: string[] = this.utilityService.getSupportedLocaleCode(profile.supportedLocales);
        this.customTranslateService.addSupportedLanguages(localesCode);
        this.customTranslateService.setDefaultLanguage(profile.userLocale);
        this.limitedProfileService.setProfileInSessionStorage(profile);
        this.authenticationService.onGetUserProfileSuccess(this.redirectUrl);
      },
      () => this.authenticationService.onGetUserProfileFailure()
    )
  }

  public getInputType(inputType: string): void {
    this.passwordInputType = inputType;
  }
}
