import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "app/account/shared/account.service";
import {AccountVerificationService} from "../shared/account-verification.service";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {NotificationService} from "../../core/notification.service";
import {UtilityService} from "../../shared/utility.service";
import {AccountActivationResponse} from "app/account/shared/account-activation-response.model";
import {AccountActivationRequest} from "../shared/account-activation-request.model";
import {ValidationRules} from "../../shared/validation-rules.model";
import {ValidationService} from "app/shared/validation.service";

@Component({
  selector: 'c2s-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit {
  public accountActivationFrom: FormGroup;
  public username: string;
  public passwordErrorMessage: string = ValidationRules.PASSWORD_MESSAGE;
  public mismatchedPasswordsMessage: string = ValidationRules.MISMATCHED_PASSWORDS_MESSAGE;

  constructor(private accountService: AccountService,
              private accountVerificationService: AccountVerificationService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private validationService: ValidationService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.accountActivationFrom = this.formBuilder.group({
      password: ['', [Validators.pattern(ValidationRules.PASSWORD_PATTERN), Validators.required]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.validationService.matchingPasswords('password', 'confirmPassword')});
    this.username = this.accountVerificationService.getUsername();
  }

  public clear() {
    this.accountActivationFrom.reset();
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
          this.notificationService.show("Error in activating user.");
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
      username: this.accountVerificationService.getUsername()
    };
  }
}
