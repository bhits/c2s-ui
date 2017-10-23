import {Component, ViewChild, OnInit, ViewEncapsulation} from "@angular/core";
import {UtilityService} from "../../core/utility.service";
import {ActivatedRoute} from "@angular/router";
import {ConsentProvider} from "c2s-ng-shared";
import {ConsentList} from "../../consent/shared/consent-list.model";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {TokenService} from "../../security/shared/token.service";
import {ConfigService} from "../../core/config.service";
import {C2sUiApiUrlService} from "../../core/c2s-ui-api-url.service";
import {Md2Dialog, Md2DialogConfig} from "md2/dialog/dialog";
import {SessionStorageService} from "../../security/shared/session-storage.service";
import { SessionStorageKey } from "../../core/c2s-constant";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  disabled: boolean;
  @ViewChild('warningDialog')
  warningDialog: Md2Dialog;
  public isHealthInformationEnabled: boolean;
  totalProviders: number = 0;
  totalConsents: number = 0;
  providers: ConsentProvider[];
  consentList: ConsentList;
  isDisabled: boolean = false;
  consentMapping: any;
  providerMapping: any;

  constructor(private utilityService: UtilityService,
              private apiUrlService: C2sUiApiUrlService,
              private route: ActivatedRoute,
              private tokenService: TokenService,
              private configService: ConfigService,
              private authenticationService: AuthenticationService,
              private sessionStorageService: SessionStorageService) {
  }

  ngOnInit() {
    if (this.configService.getConfigInSessionStorage().features.demoDisclaimerEnabled) {
      if (!this.sessionStorageService.getItemFromSessionStorage(SessionStorageKey.TERMS_OF_USE_AGREEMENT)) {
        let config = new Md2DialogConfig();
        config.disableClose = true;
        this.warningDialog.open(config);
      }
    }
    this.isHealthInformationEnabled = this.configService.getConfigInSessionStorage().features.healthInformationEnabled;
    this.consentMapping = {
      '=0': 'HOME.CONSENTS.ZERO',
      'other': 'HOME.CONSENTS.MORE'
    };

    this.providerMapping = {
      '=0': 'HOME.PROVIDERS.ZERO',
      'other': 'HOME.PROVIDERS.MORE'
    };

    this.providers = this.route.snapshot.data['providers'];
    if (this.providers) {
      this.totalProviders = this.providers.length;
      this.tokenService.storeProviderCount(this.providers.length);
    }

    this.consentList = this.route.snapshot.data['consentList'];
    if (this.consentList) {
      this.totalConsents = this.consentList.totalElements;
      this.isDisabled = this.totalProviders <= 1 ? true : false;
    }

  }

  public navigateToProviderList(): void {
    this.utilityService.navigateTo(this.apiUrlService.getProviderListUrl());
  }

  public navigateToConsentList(isDisabled: boolean, dialog: any): void {
    if (isDisabled) {
      dialog.open();
    } else {
      this.utilityService.navigateTo(this.apiUrlService.getConsentListUrl());
    }
  }

  public continue(dialog: any): void {
    dialog.close();
    this.sessionStorageService.setItemInSessionStorage(SessionStorageKey.TERMS_OF_USE_AGREEMENT, true);
  }

  public logout(dialog: any): void {
    // log out
    dialog.close();
    this.authenticationService.logout();
  }

}
