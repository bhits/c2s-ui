import {Component, OnInit} from "@angular/core";
import {UtilityService} from "../../core/utility.service";
import {TranslateService} from "@ngx-translate/core";
import {AccountVerificationService} from "../shared/account-verification.service";
import {C2sUiApiUrlService} from "../../core/c2s-ui-api-url.service";

@Component({
  selector: 'c2s-account-activation-error',
  templateUrl: './account-activation-error.component.html',
  styleUrls: ['./account-activation-error.component.scss']
})
export class AccountActivationErrorComponent implements OnInit {

  constructor(private accountVerificationService: AccountVerificationService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private utilityService: UtilityService,
              private translate: TranslateService) {
    translate.setDefaultLang(this.accountVerificationService.getUserPreferredLocale());
  }

  ngOnInit() {
  }

  public navigateTo() {
    this.utilityService.navigateTo(this.c2sUiApiUrlService.getLoginUrl());
  }
}
