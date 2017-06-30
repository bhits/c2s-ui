import {Component, OnInit} from "@angular/core";
import {TokenService} from "../../security/shared/token.service";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {Consent} from "../shared/consent.model";
import {Profile} from "../../core/profile.model";
import {ConsentTerms} from "../shared/consent-terms.model";
import {ConsentService} from "../shared/consent.service";
import {NotificationService} from "../../core/notification.service";
import {BinaryFile} from "../shared/binary-file.model";
import {UtilityService} from "../../shared/utility.service";
import {TranslateService} from "@ngx-translate/core";
import {LimitedProfileService} from "../../security/shared/limited-profile.service";

@Component({
  selector: 'c2s-consent-sign',
  templateUrl: './consent-sign.component.html',
  styleUrls: ['./consent-sign.component.css']
})
export class ConsentSignComponent implements OnInit {
  public title: string = "eSignature";
  public consent: Consent;
  public profile: Profile;
  public termsWithUserName: string;
  public checked: boolean = false;
  public isAuthenticated: boolean = false;
  public password: string;
  public inValid: boolean;
  username: any;
  birthDate: Date;

  constructor(private authenticationService: AuthenticationService,
              private consentService: ConsentService,
              private notificationService: NotificationService,
              private tokenService: TokenService,
              private limitedProfileService: LimitedProfileService,
              private route: ActivatedRoute,
              private utilityService: UtilityService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['consentId']) {
        this.consent = this.route.snapshot.data['consent'];
      }
    });
    this.profile = this.tokenService.getProfileToken();
    this.username = {name: this.profile.name};
    this.termsWithUserName = this.getConsentAttestationTerm(this.route.snapshot.data['consentTerms']);
    this.birthDate = this.limitedProfileService.getUserBirthDate();
  }

  clearCheckbox() {
    if (this.isAuthenticated != true) {
      this.checked = false;
      this.inValid = false;
    }
  }

  toAuthenticate(dialog: any) {
    const username: string = this.profile.userName;
    this.authenticationService.login(username, this.password).toPromise()
      .then(() => {
        this.inValid = false;
        this.isAuthenticated = true;
        dialog.close();
      }).catch(() => {
      this.inValid = true;
      this.password = null;
    });
  }

  attestConsent(dialog: any) {
    this.consentService.attestConsent(this.consent.id)
      .subscribe(
        () => {
          dialog.open();
        },
        err => {
          this.notificationService.show("Error in attest consent.");
          console.log(err);
        }
      );
  }

  getSignedConsentPdf() {
    const namePrefix: string = "Signed_Consent";
    this.consentService.getSignedConsentPdf(this.consent.id)
      .subscribe(
        (signedPdf: BinaryFile) => {
          this.utilityService.downloadFile(signedPdf.content, `${namePrefix}_${this.consent.id}.pdf`, signedPdf.contentType);
          this.notificationService.show("Success in downloading consent.");
        },
        err => {
          this.notificationService.show("Failed to download the consent, please try again later...");
          console.log(err);
        }
      );
  }

  navigateTo() {
    this.utilityService.navigateTo('/consent-list');
  }

  private
  getConsentAttestationTerm(consentTerms: ConsentTerms): string {
    const terms: string = consentTerms.text;
    const userNameKey: string = "${ATTESTER_FULL_NAME}";
    return terms.replace(userNameKey, this.profile.name);
  }
}
