import {Component, OnInit} from "@angular/core";
import {TokenService} from "../../security/shared/token.service";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {Consent} from "../shared/consent.model";
import {Profile} from "../../core/profile.model";
import {ConsentTerms} from "../shared/consent-terms.model";

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

  constructor(private authenticationService: AuthenticationService,
              private tokenService: TokenService,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['consentId']) {
        this.consent = this.route.snapshot.data['consent'];
      }
    });
    this.profile = this.tokenService.getProfileToken();
    this.termsWithUserName = this.getConsentAttestationTerm(this.route.snapshot.data['consentTerms']);
    //Todo: patient birth of date should get from backend
    this.profile.birthDate = new Date("1980-01-01");
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

  private getConsentAttestationTerm(consentTerms: ConsentTerms): string {
    const terms: string = consentTerms.text;
    const userNameKey: string = "${ATTESTER_FULL_NAME}";
    return terms.replace(userNameKey, this.profile.name);
  }
}
