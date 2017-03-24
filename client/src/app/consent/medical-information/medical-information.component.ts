import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import {SensitivityPolicy} from "../shared/sensitivity-policy";
import {MedicalInformationService} from "./medical-information.service";
import {MedicalInformationCategory} from "../shared/medical-information-category";
import {ConsentCreateEdit} from "../shared/consent-create-edit.model";
import {ConsentService} from "../shared/consent.service";

@Component({
  selector: 'c2s-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.css']
})
export class MedicalInformationComponent implements OnInit {

  isShareAll:number ;
  isSelectAllCategories: boolean = false;
  federalInfo:MedicalInformationCategory;
  stateInfo:MedicalInformationCategory;
  checkedSensitityPolicies: string[];

  @Input() sensitivityPoliciesCodes: string[] = [];
  @Input() sensitivityPolicies: SensitivityPolicy[];
  @Output() selectedMedicalInformation = new EventEmitter();
  private consent: ConsentCreateEdit;

  constructor(private medicalInformationService:MedicalInformationService, private consentService: ConsentService ) {
    this.consentService.getConsentEmitter().subscribe((consent)=>{
      if (consent) {
        this.consent = consent;

        if(this.consent.shareSensitivityCategories.identifiers){
          this.consent.shareSensitivityCategories.identifiers.forEach( sp =>{
            this.sensitivityPoliciesCodes.push(sp.value);
          })
        }
      }
    });
  }

  ngOnInit() {

    //TODO put in a constant service
    this.federalInfo = new MedicalInformationCategory();
    this.federalInfo.title = 'Federal Categories';
    this.federalInfo.description = 'Federal requirements strictly restrict health professionals from disclosing substance abuse treatment information without signed patient consent ' +
      '(called <a href="http://www.samhsa.gov/about-us/who-we-are/laws/confidentiality-regulations-faqs" target="_blank"> 42 CFR Part 2 <i class="fa fa-external-link"></i></a> ).' +
      'You have the right to choose the information you wish to share or not share and with whom.';

    this.stateInfo = new MedicalInformationCategory();
    this.stateInfo.title = 'State Categories';
    this.stateInfo.description = 'Most states have laws restricting health professionals from disclosing information related to substance abuse, HIV/AIDS, and mental health. ' +
      'Some states have restrictions regarding genetic information and communicable diseases. You have the right to choose the information you wish to share or not share and with whom.'

    this.updateSensitivityPoliciesStatus();
    this.updateSelectedSensitityPolicy();
  }
  private updateSelectedSensitityPolicy(){

    if(this.sensitivityPoliciesCodes.length > 0 ){
      this.isShareAll = 0;
      this.checkedSensitityPolicies = this.medicalInformationService.getSelectedSensitivityPolicies(this.sensitivityPolicies);
    }

    if(this.sensitivityPoliciesCodes.length > 0 ){
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
    dialog.open();
  }

  setSelectedMedicalInformation(dialog: any){
    dialog.close();
    this.checkedSensitityPolicies = this.medicalInformationService.getSelectedSensitivityPolicies(this.sensitivityPolicies);
    this.consent.shareSensitivityCategories = this.medicalInformationService.getSelectedSensitivityPolicyIdentifiers(this.sensitivityPolicies);
    this.consentService.setConsent(this.consent);
  }

  closeDialog(dialog: any){
    this.medicalInformationService.updateSelectedCategories(this.sensitivityPolicies, this.checkedSensitityPolicies)
    dialog.close();
  }

  onSelectDonotShareAll(dialog: any, value:number){
    this.isShareAll = value;
    dialog.open();
    this.consent.shareSensitivityCategories = this.medicalInformationService.getSelectedSensitivityPolicyIdentifiers(this.sensitivityPolicies);
    this.consentService.setConsent(this.consent);
  }

  onSelectEditDonotShareAll(dialog: any, value:number){
    this.isShareAll = value;
    dialog.open();
  }

  confirmSelectAll(dialog: any){
    dialog.close();
    this.checkedSensitityPolicies = this.medicalInformationService.getSelectedSensitivityPolicies(this.sensitivityPolicies);
    this.consent.shareSensitivityCategories = this.medicalInformationService.getSelectedSensitivityPolicyIdentifiers(this.sensitivityPolicies);
    this.consentService.setConsent(this.consent);
  }

  isCheckedAll(){
    if(this.isShareAll === 0){
      this.isSelectAllCategories =  this.medicalInformationService.isCheckedAll(this.sensitivityPolicies);
    }
  }

}
