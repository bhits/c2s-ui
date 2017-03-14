import {Component, OnInit} from "@angular/core";

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
