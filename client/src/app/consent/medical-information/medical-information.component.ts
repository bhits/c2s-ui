import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import {ConsentService} from "../shared/consent.service";
import {SensitivityPolicy} from "../shared/sensitivity-policy";
import {MedicalInformationService} from "./medical-information.service";

@Component({
  selector: 'c2s-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.css']
})
export class MedicalInformationComponent implements OnInit {
  federalInfo:any;
  stateInfo:any
  isShareAll:string ;
  checkedSensitityPolicies: SensitivityPolicy[];
  @Output() selectedMedicalInformation = new EventEmitter();
  @Input() sensitivityPoliciesCodes: string[];
  private sensitivityPolicies: SensitivityPolicy[];

  constructor(private consentService: ConsentService, private medicalInformationService:MedicalInformationService) {

  }

  ngOnInit() {
    this.federalInfo = {
      title: 'Federal Categories',
      description: 'Federal requirements strictly restrict health professionals from disclosing substance abuse treatment information without signed patient consent ' +
      '(called <a href="http://www.samhsa.gov/about-us/who-we-are/laws/confidentiality-regulations-faqs" target="_blank"> 42 CFR Part 2 <i class="fa fa-external-link"></i></a> ).' +
      'You have the right to choose the information you wish to share or not share and with whom.'
    };

    this.stateInfo = {
      title: 'State Categories',
      description: 'Most states have laws restricting health professionals from disclosing information related to substance abuse, HIV/AIDS, and mental health. ' +
      'Some states have restrictions regarding genetic information and communicable diseases. You have the right to choose the information you wish to share or not share and with whom.'
    };

    this.consentService.getSensitivityPolices()
                        .then(res => {
                            this.sensitivityPolicies = res;
                            this.updateSensitivityPoliciesStatus();
                            this.updateSelectedSensitityPolicy();
                        })
                        .catch(this.error);

  }
  private updateSelectedSensitityPolicy(){
    if(this.sensitivityPoliciesCodes.length > 0 ){
      this.isShareAll = '0';
      this.checkedSensitityPolicies = this.medicalInformationService.getSelectedSensitivityPolicies(this.sensitivityPolicies);
    }
  }
  private updateSensitivityPoliciesStatus(){
    this.medicalInformationService.updateSensitivitiesPoliciesStatus(this.sensitivityPoliciesCodes,this.sensitivityPolicies);
  }

  private getSelectedSensitivityPolicieseCode():string[]{
    return this.medicalInformationService.getSelectedSensitivityPoliciesCode(this.sensitivityPolicies)
  }

  emitSelection(value:string){
    this.selectedMedicalInformation.emit(value);
  }

  onSelectShareAll(dialog: any, value:string){
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
    this.selectedMedicalInformation.emit(this.getSelectedSensitivityPolicieseCode());
  }

  closeDialog(dialog: any){
    dialog.close();
  }

  onSelectDonotShareAll(dialog: any, value:string){
    this.isShareAll = value;
    this.medicalInformationService.setSenetivityPoliciesStatusToUnChecked(this.sensitivityPolicies);
    this.checkedSensitityPolicies = [];
    dialog.open();
    this.selectedMedicalInformation.emit(this.sensitivityPoliciesCodes);
  }

  confirmSelectAll(dialog: any){
    dialog.close();
    this.checkedSensitityPolicies = this.medicalInformationService.getSelectedSensitivityPolicies(this.sensitivityPolicies);
    this.selectedMedicalInformation.emit(this.sensitivityPoliciesCodes);
  }

  private error(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
  selectAll(){
    this.medicalInformationService.setSensitivityPoliciesStatusToChecked(this.sensitivityPolicies);
  }

  deSelectAll(){
    this.medicalInformationService.setSenetivityPoliciesStatusToUnChecked(this.sensitivityPolicies);
  }
}
