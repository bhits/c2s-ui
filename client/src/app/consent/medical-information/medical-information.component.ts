import {Component, Input, OnInit} from "@angular/core";

import {SensitivityPolicy} from "../shared/sensitivity-policy";
import {MedicalInformationService} from "./medical-information.service";
import {MedicalInformationCategory} from "../shared/medical-information-category";
import {ConsentCreateEdit} from "../shared/consent-create-edit.model";
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
  public sensitivityCategoryCodes: string[] = [];
  public isShareAll: number;
  public isSelectOneSensitivityCategory: boolean;
  public isInvalidNotShareAll: boolean = false;
  private consent: ConsentCreateEdit;
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
  }

  public onSelectShareAll(dialog: any, value: number): void {
    this.isInvalidNotShareAll = false;
    this.isShareAll = value;
    this.selectedSensitivityCategories = [];
    this.sensitivityCategoryCodes = [];
    //Set all categories checked
    this.medicalInformationService.setSensitivityPoliciesStatusToChecked(this.sensitivityPolicies);
    dialog.open(this.dialogConfig);
  }

  public onSelectDoNotShareAll(dialog: any, value: number) {
    //Set all categories Unchecked
    this.medicalInformationService.setSensitivityPoliciesStatusToUnChecked(this.sensitivityPolicies);
    if (this.consent.id != null) {
      //In Consent Edit Mode to set all selected categories checked
      this.medicalInformationService
        .setSelectedSensitivityPoliciesStatusToChecked(this.consent, this.sensitivityPolicies);
    }
    this.isShareAll = value;
    dialog.open(this.dialogConfig);
    this.checkAllCategoriesSelected();
    this.consent.shareSensitivityCategories = this.medicalInformationService.getSelectedSensitivityPolicyIdentifiers(this.sensitivityPolicies);
    this.consentService.setConsent(this.consent);
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
    this.isShareAll = null;
  }

  public isAbleToSave(): boolean {
    return !this.isSelectOneSensitivityCategory || this.isInvalidNotShareAll;
  }

  private checkAllCategoriesSelected(): void {
    this.isInvalidNotShareAll = this.medicalInformationService.isCheckedAll(this.sensitivityPolicies);
  }
}
