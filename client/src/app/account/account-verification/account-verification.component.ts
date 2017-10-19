import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../shared/account.service";
import {AccountVerificationService} from "../shared/account-verification.service";
import {UtilityService} from "../../core/utility.service";
import {AccountVerificationRequest} from "../shared/account-verification-request.model";

import {TranslateService} from "@ngx-translate/core";
import {C2sUiApiUrlService} from "../../core/c2s-ui-api-url.service";

@Component({
  selector: 'c2s-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent implements OnInit {
  public accountVerificationFrom: FormGroup;
  public FORMAT: string = "MM/dd/y";
  public today: Date = new Date();
  private emailToken: string;
  private userPreferredLocale: string;

  constructor(private accountService: AccountService,
              private accountVerificationService: AccountVerificationService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private formBuilder: FormBuilder,
              private utilityService: UtilityService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.accountVerificationFrom = this.formBuilder.group({
      birthDate: ['', Validators.required],
      verificationCode: ['', Validators.required]
    });
    this.accountVerificationService.retrieveEmailLinkInfo(this.utilityService.getCurrentNormalizedPath());
    this.emailToken = this.accountVerificationService.getEmailToken();
    this.userPreferredLocale = this.accountVerificationService.getUserPreferredLocale();
    this.translate.setDefaultLang(this.userPreferredLocale);
  }

  public clear() {
    this.accountVerificationFrom.reset();
  }

  public verify() {
    this.accountService.verifyAccount(this.prepareVerificationAccount())
      .subscribe(
        (verificationResponse) => {
          this.accountVerificationService.setVerificationInfo(this.prepareVerificationAccount());
          this.utilityService.navigateTo(this.c2sUiApiUrlService.getAccountActivationUrl())
        },
        err => {
          this.utilityService.navigateTo(this.c2sUiApiUrlService.getAccountActivationErrorUrl());
          console.log(err);
        }
      );
  }

  private prepareVerificationAccount(): AccountVerificationRequest {
    const formModel = this.accountVerificationFrom.value;
    if (this.emailToken != null) {
      return {
        birthDate: new Date(formModel.birthDate),
        verificationCode: formModel.verificationCode,
        emailToken: this.emailToken
      };
    }
  }
}
