import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilityService} from "app/shared/utility.service";
import {AccountService} from "app/account/shared/account.service";
import {C2sUiApiUrlService} from "app/shared/c2s-ui-api-url.service";
import {NotificationService} from "app/core/notification.service";
import {EmailTokenService} from "../shared/email-token.service";
import {AccountVerificationRequest} from "app/account/shared/account-verification-request.model";

@Component({
  selector: 'c2s-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent implements OnInit {
  public accountVerificationFrom: FormGroup;
  public FORMAT: string = "MM/DD/YYYY";

  constructor(private accountService: AccountService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private emailTokenService: EmailTokenService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.accountVerificationFrom = this.formBuilder.group({
      birthDate: ['', Validators.required],
      verificationCode: ['', [Validators.minLength(2), Validators.required]]
    });
    this.emailTokenService.setEmailToken(this.utilityService.getCurrentNormalizedPath());
  }

  public clear() {
    this.accountVerificationFrom.reset();
  }

  public verify() {
    this.accountService.verifyUserCreation(this.prepareCreateEditUser())
      .subscribe(
        (verificationResponse) => {
          this.utilityService.navigateTo(this.c2sUiApiUrlService.getCreateAccountPasswordUrl())
        },
        err => {
          this.notificationService.show("Error in verifying user.");
          console.log(err);
        }
      );
  }

  private prepareCreateEditUser(): AccountVerificationRequest {
    const formModel = this.accountVerificationFrom.value;
    return {
      birthDate: formModel.birthDate,
      verificationCode: formModel.verificationCode,
      emailToken: this.emailTokenService.getEmailToken()
    };
  }
}
