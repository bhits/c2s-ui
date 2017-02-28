import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {ConsentService} from "../consent.service";
import {SensitivityPolicy} from "../sensitivity-policy";
import {MedicalInformationService} from "./medical-information.service";

@Component({
  selector: 'c2s-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.css']
})
export class MedicalInformationComponent implements OnInit {

  @Input() isShareAll:string ;
  @Output() selectedMedicalInformation = new EventEmitter();
  @Input() sensitivityPoliciesCodes: string[];
  private sensitivityPolicies: SensitivityPolicy[];

  constructor(private consentService: ConsentService, private medicalInformationService:MedicalInformationService) {

  }

  ngOnInit() {
    this.consentService.getSensitivityPolices()
                        .then(res => {
                            this.sensitivityPolicies = res;
                            this.updateSensitivityPoliciesStatus();
                        })
                        .catch(this.error);
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

  onSelectShareAll(value:string){
    this.isShareAll = "1";
    this.sensitivityPoliciesCodes = [];
    //Unchecked all checked boxes
    this.medicalInformationService.setSenetivityPoliciesStatusToUnChecked(this.sensitivityPolicies);
    this.selectedMedicalInformation.emit(this.sensitivityPoliciesCodes);
  }

  setSelectedMedicalInformation(dialog: any){
    dialog.close();
    this.selectedMedicalInformation.emit(this.getSelectedSensitivityPolicieseCode());
  }

  closeDialog(dialog: any){
    dialog.close();
  }

  onSelectDonotShareAll(dialog: any, value:string){
    dialog.open();
    this.isShareAll = "0";
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
