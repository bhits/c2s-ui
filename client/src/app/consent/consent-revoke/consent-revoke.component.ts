import {Component, OnInit} from "@angular/core";

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

  constructor() {
  }

  ngOnInit() {
  }

  clearCheckbox() {
    if (this.isAuthenticated != true) {
      this.checked = false;
    }
  }

  toAuthenticate(dialog: any) {
    if (this.password === '123456') {
      this.inValid = false;
      this.isAuthenticated = true;
      dialog.close();
    } else {
      this.inValid = true;
    }
  }
}
