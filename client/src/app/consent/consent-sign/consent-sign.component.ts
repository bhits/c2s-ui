import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {DetailedConsent} from "../shared/detailed-consent.model";
import {ConsentTerms} from "../shared/consent-terms.model";
import {ConsentService} from "../shared/consent.service";
import {NotificationService} from "../../core/notification.service";
import {BinaryFile} from "../shared/binary-file.model";
import {UtilityService} from "../../core/utility.service";
import {LimitedProfileService} from "../../security/shared/limited-profile.service";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";

@Component({
  selector: 'c2s-consent-sign',
  templateUrl: './consent-sign.component.html',
  styleUrls: ['./consent-sign.component.css']
})
export class ConsentSignComponent implements OnInit {
  public consent: DetailedConsent;
  public termsWithUserName: string;
  public checked: boolean = false;
  public isAuthenticated: boolean = false;
  public password: string;
  public inValid: boolean;
  public usernameTranslateParam: any;
  public userFullName: string;
  public birthDate: Date;

  constructor(private authenticationService: AuthenticationService,
              private apiUrlService: C2sUiApiUrlService,
              private consentService: ConsentService,
              private notificationService: NotificationService,
              private limitedProfileService: LimitedProfileService,
              private route: ActivatedRoute,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['consentId']) {
        this.consent = this.route.snapshot.data['consent'];
      }
    });
    this.birthDate = this.limitedProfileService.getUserBirthDate();
    this.userFullName = this.limitedProfileService.getFullName();
    this.usernameTranslateParam = {name: this.userFullName};
    this.termsWithUserName = this.getConsentAttestationTerm(this.route.snapshot.data['consentTerms']);
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

  public attestConsent(dialog: any): void {
    this.consentService.attestConsent(this.consent.id)
      .subscribe(
        () => {
          dialog.open();
        },
        err => {
          this.consentService.handleSignConsentError(err);
          console.log(err);
        }
      );
  }

  public getSignedConsentPdf(): void {
    const namePrefix: string = "Signed_Consent";
    this.consentService.getSignedConsentPdf(this.consent.id)
      .subscribe(
        (signedPdf: BinaryFile) => {
          this.utilityService.downloadFile(signedPdf.content, `${namePrefix}_${this.consent.id}.pdf`, signedPdf.contentType);
          this.notificationService.i18nShow('NOTIFICATION_MSG.SUCCESS_DOWNLOAD_SIGNED_CONSENT');
        },
        err => {
          this.notificationService.i18nShow('NOTIFICATION_MSG.FAILED_DOWNLOAD_SIGNED_CONSENT');
          console.log(err);
        }
      );
  }

  public getConsentAttestationTerm(consentTerms: ConsentTerms): string {
    const terms: string = consentTerms.text;
    const userNameKey: string = "${ATTESTER_FULL_NAME}";
    return terms.replace(userNameKey, this.userFullName);
  }

  public navigateToConsentList(): void {
    this.utilityService.navigateTo(this.apiUrlService.getConsentListUrl());
  }
}
