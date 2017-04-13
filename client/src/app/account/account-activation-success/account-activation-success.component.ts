import {Component, OnInit} from "@angular/core";
import {AccountService} from "app/account/shared/account.service";
import {C2sUiApiUrlService} from "app/shared/c2s-ui-api-url.service";
import {UtilityService} from "app/shared/utility.service";

@Component({
  selector: 'c2s-account-activation-success',
  templateUrl: './account-activation-success.component.html',
  styleUrls: ['./account-activation-success.component.scss']
})
export class AccountActivationSuccessComponent implements OnInit {
  public userFullName: string;
  public brandName: string = "Consent2Share";

  constructor(private accountService: AccountService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.userFullName = this.accountService.getUserFullName();
  }

  public navigateTo() {
    this.utilityService.navigateTo(this.c2sUiApiUrlService.getLoginUrl());
  }
}
