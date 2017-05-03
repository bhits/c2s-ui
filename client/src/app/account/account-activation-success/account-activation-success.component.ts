import {Component, OnInit} from "@angular/core";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {UtilityService} from "../../shared/utility.service";
import {AccountVerificationService} from "../shared/account-verification.service";

@Component({
  selector: 'c2s-account-activation-success',
  templateUrl: './account-activation-success.component.html',
  styleUrls: ['./account-activation-success.component.scss']
})
export class AccountActivationSuccessComponent implements OnInit {
  public userFullName: string;
  //Todo: Get from config server
  public brandName: string = "Consent2Share";

  constructor(private accountVerificationService: AccountVerificationService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.userFullName = this.accountVerificationService.getUserFullName();
  }

  public navigateTo() {
    this.accountVerificationService.deleteUserFullName();
    this.utilityService.navigateTo(this.c2sUiApiUrlService.getLoginUrl());
  }
}
