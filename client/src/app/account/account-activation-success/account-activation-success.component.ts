import {Component, OnInit} from "@angular/core";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {UtilityService} from "../../shared/utility.service";
import {AccountVerificationService} from "../shared/account-verification.service";

import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'c2s-account-activation-success',
  templateUrl: './account-activation-success.component.html',
  styleUrls: ['./account-activation-success.component.scss']
})
export class AccountActivationSuccessComponent implements OnInit {
  // public userFullName: any ;
  public brand: any = {brandName: "Consent2Share"};
  public fullName: any;

  constructor(private accountVerificationService: AccountVerificationService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private utilityService: UtilityService,
              private translate:TranslateService) {
    translate.setDefaultLang('en');
    //translate.use('es');

  }


  ngOnInit() {
    //let userFullName = this.accountService.getUserFullName();
    this.fullName = {
      userFullName: this.accountVerificationService.getUserFullName()
    }
  }

  public navigateTo() {
    this.accountVerificationService.deleteUserFullName();
    this.utilityService.navigateTo(this.c2sUiApiUrlService.getLoginUrl());
  }
}
