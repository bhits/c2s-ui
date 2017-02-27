import {Component, OnInit, Input} from "@angular/core";
import {Consent} from "../shared/consent.model";

@Component({
  selector: 'c2s-consent-card',
  templateUrl: './consent-card.component.html',
  styleUrls: ['./consent-card.component.css']
})
export class ConsentCardComponent implements OnInit {
  @Input() private consent: Consent;

  constructor() {
  }

  ngOnInit() {
  }

  private getStateText(state: string): string {
    let stateText: string;
    switch (state) {
      case "CONSENT_SAVED":
        stateText = "IN PROGRESS";
        break;
      case "CONSENT_SIGNED":
        stateText = "SIGNED";
        break;
      case "REVOCATION_REVOKED":
        stateText = "REVOKED";
        break
    }
    return stateText;
  }

}
