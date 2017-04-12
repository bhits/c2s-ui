import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountVerificationService} from "app/account/shared/account-verification.service";
import {AccountActivationRequest} from "app/account/shared/account-activation-request.model";
import {AccountService} from "app/account/shared/account.service";
import {NotificationService} from "app/core/notification.service";
import {UtilityService} from "app/shared/utility.service";
import {C2sUiApiUrlService} from "app/shared/c2s-ui-api-url.service";
import {AccountActivationResponse} from "app/account/shared/account-activation-response.model";

@Component({
  selector: 'c2s-create-account-password',
  templateUrl: './create-account-password.component.html',
  styleUrls: ['./create-account-password.component.scss']
})
export class CreateAccountPasswordComponent implements OnInit {
  public createAccountPasswordFrom: FormGroup;
  public username: string;

  constructor(private accountService: AccountService,
              private accountVerificationService: AccountVerificationService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.createAccountPasswordFrom = this.formBuilder.group({
      password: ['', [Validators.minLength(2), Validators.required]],
      confirmPassword: ['', [Validators.minLength(2), Validators.required]]
    });
    this.username = this.accountVerificationService.getUsername();
  }

  public clear() {
    this.createAccountPasswordFrom.reset();
  }

  public activate() {
    this.accountService.activateAccount(this.prepareActivationAccount())
      .subscribe(
        (activationResponse: AccountActivationResponse) => {
          this.accountService.setUserFullName(activationResponse);
          // this.utilityService.navigateTo(this.c2sUiApiUrlService.getCreateAccountPasswordUrl())
          console.log(this.accountService.getUserFullName());
        },
        err => {
          this.notificationService.show("Error in activating user.");
          console.log(err);
        }
      );
  }

  private prepareActivationAccount(): AccountActivationRequest {
    const formModel = this.createAccountPasswordFrom.value;
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
