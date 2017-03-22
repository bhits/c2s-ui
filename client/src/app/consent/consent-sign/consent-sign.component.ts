import {Component, OnInit} from "@angular/core";
import {TokenService} from "../../security/shared/token.service";
import {AuthenticationService} from "../../security/shared/authentication.service";

@Component({
  selector: 'c2s-consent-sign',
  templateUrl: './consent-sign.component.html',
  styleUrls: ['./consent-sign.component.css']
})
export class ConsentSignComponent implements OnInit {
  public title: string = "eSignature";
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
