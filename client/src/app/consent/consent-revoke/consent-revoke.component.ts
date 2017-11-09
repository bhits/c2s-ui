import {Component, OnInit} from "@angular/core";

import {AuthenticationService} from "../../security/shared/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {ConsentService} from "../shared/consent.service";
import {ConsentRevocation} from "../shared/consent-revocation.model";
import {NotificationService} from "../../core/notification.service";
import {BinaryFile} from "../shared/binary-file.model";
import {UtilityService} from "../../core/utility.service";
import {LimitedProfileService} from "../../security/shared/limited-profile.service";
import {DetailedConsent} from "c2s-ng-shared";
import {C2sUiApiUrlService} from "../../core/c2s-ui-api-url.service";

@Component({
  selector: 'c2s-consent-revoke',
  templateUrl: './consent-revoke.component.html',
  styleUrls: ['./consent-revoke.component.css']
})
export class ConsentRevokeComponent implements OnInit {
  public consent: DetailedConsent;
  public checked: boolean = false;
  public isAuthenticated: boolean = false;
  public password: string;
  public inValid: boolean;
  public consentRevocationTerms: string;
  public usernameTranslateParam: any;
  public userFullName: string;
  public birthDate: Date;

  constructor(private authenticationService: AuthenticationService,
              private apiUrlService: C2sUiApiUrlService,
              private route: ActivatedRoute,
              private consentService: ConsentService,
              private utilityService: UtilityService,
              private notificationService: NotificationService,
              private limitedProfileService: LimitedProfileService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['consentId']) {
        this.consent = this.route.snapshot.data['consent'];
      }
    });
    this.consentRevocationTerms = this.route.snapshot.data['consentRevocationTerms'].text;
    this.birthDate = this.limitedProfileService.getUserBirthDate();
    this.userFullName = this.limitedProfileService.getFullName();
    this.usernameTranslateParam = {name: this.userFullName};
  }

  public clearCheckbox(): void {
    if (this.isAuthenticated != true) {
      this.checked = false;
      this.inValid = false;
    }
  }

  public toAuthenticate(dialog: any): void {
    const username: string = this.limitedProfileService.getUserName();
    this.authenticationService.login(username, this.password)
      .subscribe(
        () => {
          this.inValid = false;
          this.isAuthenticated = true;
          dialog.close();
        },
        () => {
          this.inValid = true;
          this.password = null;
        }
      );
  }

  public revokeConsent(dialog: any): void {
    let consentRevocation = new ConsentRevocation(true);
    this.consentService.revokeConsent(consentRevocation, this.consent.id).subscribe(
      () => {
        dialog.open();
      },
      () => {
        this.notificationService.i18nShow('NOTIFICATION_MSG.FAILED_REVOKED_CONSENT');
      }
    )
  }

  public downloadRevokedConsent(): void {
    this.consentService.getRevokedConsentPdf(this.consent.id)
      .subscribe(
        (revokedPdf: BinaryFile) => this.onSuccess(revokedPdf, "Revoked_consent"),
        (error: any) => this.onError);
  }

  public onSuccess(revokedPdf: BinaryFile, prefix: string): void {
    this.utilityService.downloadFile(revokedPdf.content, `${prefix}_${this.consent.id}.pdf`, revokedPdf.contentType);
    this.notificationService.i18nShow('NOTIFICATION_MSG.SUCCESS_DOWNLOAD_REVOKED_CONSENT');
  }

  public onError(error: any): void {
    this.notificationService.i18nShow('NOTIFICATION_MSG.FAILED_DOWNLOAD_REVOKED_CONSENT');
  }

  public navigateToConsentList(): void {
    this.utilityService.navigateTo(this.apiUrlService.getConsentListUrl());
  }
}
