import {Component, OnInit} from "@angular/core";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {UtilityService} from "../../shared/utility.service";
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'c2s-account-activation-error',
  templateUrl: './account-activation-error.component.html',
  styleUrls: ['./account-activation-error.component.scss']
})
export class AccountActivationErrorComponent implements OnInit {

  constructor(private c2sUiApiUrlService: C2sUiApiUrlService,
              private utilityService: UtilityService,
              private translate: TranslateService) {
    translate.setDefaultLang('en');
    //translate.use('es');
  }

  ngOnInit() {
  }

  public navigateTo() {
    this.utilityService.navigateTo(this.c2sUiApiUrlService.getLoginUrl());
  }
}
