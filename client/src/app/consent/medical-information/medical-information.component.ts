import { Component, Input, OnInit } from '@angular/core';

import {SensitivityPolicy} from "../shared/sensitivity-policy";
import {MedicalInformationService} from "./medical-information.service";
import {MedicalInformationCategory} from "../shared/medical-information-category";
import {ConsentCreateEdit} from "../shared/consent-create-edit.model";
import {ConsentService} from "../shared/consent.service";
import {TranslateService} from "@ngx-translate/core";
import {Md2DialogConfig} from "md2";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'c2s-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.css']
})
export class MedicalInformationComponent implements OnInit {

  isShareAll:number ;
  isAllCategoriesSelected: boolean = false;
  federalInfo:MedicalInformationCategory;
  stateInfo:MedicalInformationCategory;
  checkedSensitityPolicies: string[] = [];

  sensitivityPoliciesCodes: string[] = [];
  @Input() sensitivityPolicies: SensitivityPolicy[];
  private consent: ConsentCreateEdit;
  dialogConfig: Md2DialogConfig = new Md2DialogConfig();

  constructor(private medicalInformationService:MedicalInformationService,
              private consentService: ConsentService,
              private translate: TranslateService,
              private sanitizer: DomSanitizer) {
    this.consentService.getConsentEmitter().subscribe((consent)=>{
      if (consent) {
        this.consent = consent;
      }
    });
  }

  ngOnInit() {
    this.dialogConfig.disableClose = true;
    //TODO put in a constant service
    this.federalInfo = new MedicalInformationCategory();
    this.federalInfo.title = 'FED_TITLE';
    this.federalInfo.description = 'FED_DESCRIPTION';

    this.stateInfo = new MedicalInformationCategory();
    this.stateInfo.title = 'STATE_TITLE';
    this.stateInfo.description = 'STATE_DESCRIPTION';

    if(this.consent.shareSensitivityCategories.identifiers){
      this.consent.shareSensitivityCategories.identifiers.forEach( sp =>{
        this.sensitivityPoliciesCodes.push(sp.value);
      })
    }

    this.updateSensitivityPoliciesStatus();
    this.updateSelectedSensitityPolicy();
  }
  private updateSelectedSensitityPolicy(){
    if( this.sensitivityPoliciesCodes.length > 0 && (this.sensitivityPoliciesCodes.length === this.sensitivityPolicies.length)){
      this.isShareAll = 1;
    }else if( (this.sensitivityPoliciesCodes.length > 0)&& (this.sensitivityPoliciesCodes.length < this.sensitivityPolicies.length) ){
      this.isShareAll = 0;
      this.checkedSensitityPolicies = this.medicalInformationService.getSelectedSensitivityPolicies(this.sensitivityPolicies);
    }
  }


  private updateSensitivityPoliciesStatus(){
    this.medicalInformationService.updateSensitivitiesPoliciesStatus(this.sensitivityPoliciesCodes,this.sensitivityPolicies);
  }

  onSelectShareAll(dialog: any, value:number){
    this.isShareAll = value;
    this.checkedSensitityPolicies = [];
    this.sensitivityPoliciesCodes = [];
    //Unchecked all checked boxes
    this.medicalInformationService.setSensitivityPoliciesStatusToChecked(this.sensitivityPolicies);
    dialog.open(this.dialogConfig);
  }

  setSelectedMedicalInformation(dialog: any){
    dialog.close();
    this.checkedSensitityPolicies = this.medicalInformationService.getSelectedSensitivityPolicies(this.sensitivityPolicies);
    this.consent.shareSensitivityCategories = this.medicalInformationService.getSelectedSensitivityPolicyIdentifiers(this.sensitivityPolicies);
    this.consentService.setConsent(this.consent);
  }

  closeDialog(dialog: any){
    this.medicalInformationService.updateSelectedCategories(this.sensitivityPolicies, this.checkedSensitityPolicies);
    dialog.close();
  }

  onSelectDonotShareAll(dialog: any, value:number){
    this.checkAllCategoriesSelected();

    this.isShareAll = value;
    dialog.open(this.dialogConfig);
    this.consent.shareSensitivityCategories = this.medicalInformationService.getSelectedSensitivityPolicyIdentifiers(this.sensitivityPolicies);
    this.consentService.setConsent(this.consent);
  }

  onSelectEditDonotShareAll(dialog: any, value:number){
    this.isShareAll = value;
    dialog.open(this.dialogConfig);
  }

  confirmSelectAll(dialog: any){
    dialog.close();
    this.checkedSensitityPolicies = this.medicalInformationService.getSelectedSensitivityPolicies(this.sensitivityPolicies);
    this.consent.shareSensitivityCategories = this.medicalInformationService.getSelectedSensitivityPolicyIdentifiers(this.sensitivityPolicies);
    this.consentService.setConsent(this.consent);
  }

  isCheckedAll(){
    if(this.isShareAll === 0){
      this.checkAllCategoriesSelected();
    }
  }

  private checkAllCategoriesSelected(){
    this.isAllCategoriesSelected =  this.medicalInformationService.isCheckedAll(this.sensitivityPolicies);
  }

}
