import {Component, Input, OnInit} from "@angular/core";

import {PurposeOfUseService} from "./purpose-of-use.service";
import {ConsentService} from "../shared/consent.service";
import {Consent, SharePurpose} from "c2s-ng-shared";

@Component({
  selector: 'c2s-purpose-of-use',
  templateUrl: './purpose-of-use.component.html',
  styleUrls: ['./purpose-of-use.component.css']
})
export class PurposeOfUseComponent implements OnInit {
  @Input() purposeOfUSes: SharePurpose[];
  checkedPurposeOfUses: string[];
  consent: Consent;

  constructor(private purposeOfUseService: PurposeOfUseService, private consentService: ConsentService) {
    this.consentService.getConsentEmitter().subscribe((consent) => {
      if (consent) {
        this.consent = consent;
      }
    });
  }

  ngOnInit() {
    this.purposeOfUseService.updatePurposeOfUseStatus(this.consent.sharePurposes, this.purposeOfUSes);
    this.checkedPurposeOfUses = this.purposeOfUseService.getCheckedPurposeOfUse(this.purposeOfUSes);
  }

  closeDialog(dialog: any) {
    this.purposeOfUseService.updateSelectedPurposeOfUse(this.checkedPurposeOfUses, this.purposeOfUSes);
    dialog.close();
  }

  openDialog(dialog: any) {
    dialog.open();
  }

  setSelectedPurposesOfUse(dialog: any) {
    dialog.close();
    this.checkedPurposeOfUses = this.purposeOfUseService.getCheckedPurposeOfUse(this.purposeOfUSes);
    this.consent.sharePurposes = this.purposeOfUseService.getSelectedPurposeOfUse(this.purposeOfUSes);
    this.consentService.setConsent(this.consent);
  }

  selectAll() {
    this.purposeOfUseService.setPurposeOfUseStatusToChecked(this.purposeOfUSes);
  }

  deSelectAll() {
    this.purposeOfUseService.setPurposeOfUseStatusToUnChecked(this.purposeOfUSes);
  }
}
