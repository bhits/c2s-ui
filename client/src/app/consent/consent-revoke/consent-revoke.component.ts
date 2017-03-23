import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {TokenService} from "../../security/shared/token.service";

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

  constructor(private authenticationService: AuthenticationService,
              private tokenService: TokenService) {
  }

  ngOnInit() {
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
