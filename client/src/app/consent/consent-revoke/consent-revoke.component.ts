import {Component, OnInit} from "@angular/core";

import {AuthenticationService} from "../../security/shared/authentication.service";
import {TokenService} from "../../security/shared/token.service";
import {ActivatedRoute} from "@angular/router";
import {ConsentService} from "../shared/consent.service";
import {ConsentRevocation} from "../shared/consent-revocation.model";
import {NotificationService} from "../../core/notification.service";
import {BinaryFile} from "../shared/binary-file.model";
import {UtilityService} from "../../shared/utility.service";
import {TranslateService} from "@ngx-translate/core";
import {LimitedProfileService} from "../../security/shared/limited-profile.service";
import {Consent} from "../shared/consent.model";

@Component({
  selector: 'c2s-consent-revoke',
  templateUrl: './consent-revoke.component.html',
  styleUrls: ['./consent-revoke.component.css']
})
export class ConsentRevokeComponent implements OnInit {
  public title: string = "Revoke Consent";
  public checked: boolean = false;
  public isAuthenticated: boolean = false;
  public password: string;
  public inValid: boolean;
  public consent: Consent;
  consentRevocationTerms: string;
  private userName: string;
  fullName: string;
  consentId: string;
  username:any;
  birthDate: Date;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private tokenService: TokenService,
              private consentService: ConsentService,
              private utilityService: UtilityService,
              private notificationService: NotificationService,
              private translate: TranslateService,
              private limitedProfileService: LimitedProfileService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['consentId']) {
        this.consent = this.route.snapshot.data['consent'];
      }
    });
    this.consentRevocationTerms = this.route.snapshot.data['consentRevocationTerms'].text;
    let profile = this.tokenService.getProfileToken();
    this.userName = profile.userName;
    this.fullName = profile.name;
    this.username = {name: profile.name};
    this.birthDate = this.limitedProfileService.getUserBirthDate();

    this.route.params.subscribe(params => {
      if (params['consentId']) {
        this.consentId = params['consentId'];
      }
    });
  }

  clearCheckbox() {
    if (this.isAuthenticated != true) {
      this.checked = false;
      this.inValid = false;
    }
  }

  toAuthenticate(dialog: any) {
    this.authenticationService.login(this.userName, this.password)
      .subscribe(
        () => {
          this.inValid = false;
          this.isAuthenticated = true;
          dialog.close();
        },
        error => {
          this.inValid = true;
          this.password = null;
        }
      );
  }

  revokeConsent(dialog: any) {
    let consentRevocation = new ConsentRevocation(true);
    this.consentService.revokeConsent(consentRevocation, this.consentId).subscribe(
      () => {
        dialog.open();
      },
      err => {
        this.notificationService.show("Error in revoking concent.");
      }
    )
  }

  navigateTo() {
    this.utilityService.navigateTo('/consent-list');
  }

  downloadRevokedConsent() {
    this.consentService.getRevokedConsentPdf(parseInt(this.consentId))
      .subscribe(
        (revokedPdf: BinaryFile) => this.onSuccess(revokedPdf, "Revoked_consent"),
        (error: any) => this.onError);
  }

  onSuccess(revokedPdf: BinaryFile, prefix: string) {
    this.utilityService.downloadFile(revokedPdf.content, `${prefix}_${this.consentId}.pdf`, revokedPdf.contentType);
    this.notificationService.show("Success in downloading revoked consent pdf ...");
  }

  onError(error: any) {
    this.notificationService.show("Error in downloading revoked consent pdf ...");
  }
}
