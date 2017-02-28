import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {ConsentService} from "../consent.service";
import {SensitivityPolicy} from "../sensitivity-policy";

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

  constructor(private consentService: ConsentService) {

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
    this.consentService.updateSensitivitiesPoliciesStatus(this.sensitivityPoliciesCodes,this.sensitivityPolicies);
  }

  private getSelectedSensitivityPolicieseCode():string[]{
    return this.consentService.getSelectedSensitivityPoliciesCode(this.sensitivityPolicies)
  }

  emitSelection(value:string){
    this.selectedMedicalInformation.emit(value);
  }

  onSelectShareAll(value:string){
    this.isShareAll = "1";
    this.sensitivityPoliciesCodes = [];
    //Unchecked all checked boxes
    this.consentService.setSenetivityPoliciesStatusToUnChecked(this.sensitivityPolicies);
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
    this.consentService.setSensitivityPoliciesStatusToChecked(this.sensitivityPolicies);
  }

  deSelectAll(){
    this.consentService.setSenetivityPoliciesStatusToUnChecked(this.sensitivityPolicies);
  }
}
