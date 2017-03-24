import {Component, OnInit} from "@angular/core";
import {TokenService} from "../../security/shared/token.service";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {Consent} from "../shared/consent.model";

@Component({
  selector: 'c2s-consent-sign',
  templateUrl: './consent-sign.component.html',
  styleUrls: ['./consent-sign.component.css']
})
export class ConsentSignComponent implements OnInit {
  public title: string = "eSignature";
  private consent: Consent;
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
  }

  clearCheckbox() {
    if (this.isAuthenticated != true) {
      this.checked = false;
      this.inValid = false;
    }
  }

  toAuthenticate(dialog: any) {
    const username: string = this.tokenService.getProfileToken().userName;
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
}
