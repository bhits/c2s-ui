import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {TokenService} from "../../security/shared/token.service";
import {ActivatedRoute} from "@angular/router";
import {ConsentService} from "../shared/consent.service";
import {ConsentRevocation} from "../shared/consent-revocation.model";
import {NotificationService} from "../../core/notification.service";

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
  private consentRevocationTerms: string;
  private userName: string;
  private fullName: string;
  private consentId: string;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private tokenService: TokenService,
              private consentService: ConsentService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.consentRevocationTerms = this.route.snapshot.data['consentRevocationTerms'];
    this.userName = this.tokenService.getProfileToken().userName;
    this.fullName = this.tokenService.getProfileToken().name;

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
                  (success)=>{
                    this.inValid = false;
                    this.isAuthenticated = true;

                    let consentRevocation = new ConsentRevocation(true);
                    this.consentService.revokeConsent(consentRevocation,this.consentId).subscribe(
                      (success)=>{
                        dialog.close();
                      },
                      (error)=>{
                        dialog.close();
                        this.notificationService.show("Error in revoking concent.");
                      }
                    )
                  },
                  (error)=>{
                    this.inValid = true;
                    this.password = null;
                  }
      );

    }
}
