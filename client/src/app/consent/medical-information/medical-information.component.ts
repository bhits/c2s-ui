import {Component, Input, OnInit} from "@angular/core";

import {SensitivityPolicy} from "../shared/sensitivity-policy";
import {MedicalInformationService} from "./medical-information.service";
import {MedicalInformationCategory} from "../shared/medical-information-category";
import {Consent} from "c2s-ng-shared";
import {ConsentService} from "../shared/consent.service";
import {Md2DialogConfig} from "md2";

@Component({
  selector: 'c2s-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['medical-information.component.scss']
})
export class MedicalInformationComponent implements OnInit {
  @Input() sensitivityPolicies: SensitivityPolicy[];
  public readonly notShareAllValue: number = 0;
  public readonly shareAllValue: number = 1;
  public selectedSensitivityCategories: string[];
  public isShareAll: number;
  public isSelectOneSensitivityCategory: boolean;
  public isInvalidNotShareAll: boolean = false;
  private consent: Consent;
  private dialogConfig: Md2DialogConfig = new Md2DialogConfig();
  public federalInfo: MedicalInformationCategory;
  public stateInfo: MedicalInformationCategory;

  constructor(private medicalInformationService: MedicalInformationService,
              private consentService: ConsentService) {
    this.consentService.getConsentEmitter().subscribe((consent) => {
      if (consent) {
        this.consent = consent;
      }
    });
  }

  ngOnInit() {
    this.dialogConfig.disableClose = true;
    let consentSensitivityCategories: SensitivityPolicy[] = this.medicalInformationService.mapConsentSensitivityCategoriesToSensitivityCategories(this.consent, this.sensitivityPolicies);
    this.selectedSensitivityCategories = this.medicalInformationService.getSelectedSensitivityPolicies(consentSensitivityCategories);
    //TODO put in a constant service
    this.federalInfo = new MedicalInformationCategory();
    this.federalInfo.title = 'CONSENT_CREATE_EDIT.MEDICAL_INFORMATION.DIALOG.FED_TITLE';
    this.federalInfo.description = 'CONSENT_CREATE_EDIT.MEDICAL_INFORMATION.DIALOG.FED_DESCRIPTION';

    this.stateInfo = new MedicalInformationCategory();
    this.stateInfo.title = 'CONSENT_CREATE_EDIT.MEDICAL_INFORMATION.DIALOG.STATE_TITLE';
    this.stateInfo.description = 'CONSENT_CREATE_EDIT.MEDICAL_INFORMATION.DIALOG.STATE_DESCRIPTION';
    this.setRadioButton();
  }

  public setRadioButton(): void {
    if (this.selectedSensitivityCategories.length === 0) {
      this.isShareAll = null;
    } else {
      this.isShareAll = this.selectedSensitivityCategories.length === this.sensitivityPolicies.length ? 1 : 0;
    }
  }

  public onSelectShareAll(dialog: any, value: number): void {
    this.isInvalidNotShareAll = false;
    //Set all categories checked
    this.medicalInformationService.setSensitivityPoliciesStatusToChecked(this.sensitivityPolicies);
    dialog.open(this.dialogConfig);
  }

  public onSelectDoNotShareAll(dialog: any, value: number) {
    if (this.isShareAll === null || this.isShareAll === 1) {
      // Set all categories Unchecked
      this.isSelectOneSensitivityCategory = false;
      this.medicalInformationService.setSensitivityPoliciesStatusToUnChecked(this.sensitivityPolicies);
    } else {
      this.medicalInformationService.setSelectedSensitivityPoliciesStatusToChecked(this.consent, this.sensitivityPolicies);
    }
    dialog.open(this.dialogConfig);
    this.checkAllCategoriesSelected();
  }

  public setSelectedMedicalInformation(dialog: any) {
    dialog.close();
    this.selectedSensitivityCategories = this.medicalInformationService.getSelectedSensitivityPolicies(this.sensitivityPolicies);
    this.consent.shareSensitivityCategories = this.medicalInformationService.getSelectedSensitivityPolicyIdentifiers(this.sensitivityPolicies);
    this.consentService.setConsent(this.consent);
  }

  public confirmSelectAll(dialog: any): void {
    this.setSelectedMedicalInformation(dialog);
  }

  public checkCategoriesSelectedStatus(): void {
    if (this.isShareAll === 0) {
      this.checkAllCategoriesSelected();
    }
    this.isSelectOneSensitivityCategory = this.medicalInformationService.isCheckedOne(this.sensitivityPolicies);
  }

  public cancel(dialog: any): void {
    dialog.close();
    this.setRadioButton();
  }

  public isAbleToSave(): boolean {
    return !this.isSelectOneSensitivityCategory || this.isInvalidNotShareAll;
  }

  private checkAllCategoriesSelected(): void {
    this.isInvalidNotShareAll = this.medicalInformationService.isCheckedAll(this.sensitivityPolicies);
  }
}
