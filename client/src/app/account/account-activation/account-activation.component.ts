import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountVerificationService} from "../shared/account-verification.service";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {UtilityService} from "../../shared/utility.service";
import {AccountActivationRequest} from "../shared/account-activation-request.model";
import {ValidationRules} from "../../shared/validation-rules.model";
import {AccountService} from "../shared/account.service";
import {ValidationService} from "../../shared/validation.service";
import {AccountActivationResponse} from "../shared/account-activation-response.model";
import {Subject} from "rxjs/Subject";
import {NotificationService} from "../../core/notification.service";

import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'c2s-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit {
  private usernameTerms = new Subject<string>();
  public isUsernameUsed: boolean;
  public accountActivationFrom: FormGroup;
  public passwordErrorMessage: string = ValidationRules.PASSWORD_MESSAGE;
  public mismatchedPasswordsMessage: string = ValidationRules.MISMATCHED_PASSWORDS_MESSAGE;

  constructor(private accountService: AccountService,
              private accountVerificationService: AccountVerificationService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private validationService: ValidationService,
              private utilityService: UtilityService,
              private translate : TranslateService) {
    translate.setDefaultLang('en');
    //translate.use('es');


  }

  ngOnInit() {
    this.accountActivationFrom = this.formBuilder.group({
      username: ['', [Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH), Validators.required]],
      password: ['', [Validators.pattern(ValidationRules.PASSWORD_PATTERN), Validators.required]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.validationService.matchingPasswords('password', 'confirmPassword')});

    this.usernameTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(username => this.accountService.checkDuplicateUsername(username))
      .subscribe(
        (res) => {
          this.isUsernameUsed = res.used;
        },
        err => {
          this.notificationService.show("Failed to check username, please try again later...");
        });
  }

  public clear() {
    this.accountActivationFrom.reset();
  }

  public checkUsername(): void {
    this.usernameTerms.next(this.accountActivationFrom.value.username);
  }

  public activate() {
    this.accountService.activateAccount(this.prepareActivationAccount())
      .subscribe(
        (activationResponse: AccountActivationResponse) => {
          this.accountService.setUserFullName(activationResponse);
          this.utilityService.navigateTo(this.c2sUiApiUrlService.getAccountActivationSuccessUrl());
          this.accountVerificationService.deleteVerificationInfo();
        },
        err => {
          this.utilityService.navigateTo(this.c2sUiApiUrlService.getAccountActivationErrorUrl());
          console.log(err);
        }
      );
  }

  private prepareActivationAccount(): AccountActivationRequest {
    const formModel = this.accountActivationFrom.value;
    return {
      emailToken: this.accountVerificationService.getVerificationInfo().emailToken,
      verificationCode: this.accountVerificationService.getVerificationInfo().verificationCode,
      birthDate: this.accountVerificationService.getVerificationInfo().birthDate,
      password: formModel.password,
      confirmPassword: formModel.confirmPassword,
      username: formModel.username
    };
  }
}
