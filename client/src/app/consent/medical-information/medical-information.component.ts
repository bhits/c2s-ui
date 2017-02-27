import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {ConsentService} from "../consent.service";
import {SensitivityPolicy} from "../sensitivity-policy";

@Component({
  selector: 'c2s-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.css']
})
export class MedicalInformationComponent implements OnInit {

  @Input() medicalInformation:string ;
  @Output() selectedMedicalInformation = new EventEmitter();
  private sensitivityPolicies: SensitivityPolicy[];

  constructor(private consentService: ConsentService) { }

  ngOnInit() {
    this.consentService.getSensitivityPolices()
      .then(res => this.sensitivityPolicies = res)
      .catch(this.error);
  }

  emitSelection(value:string){
    this.selectedMedicalInformation.emit(value);
  }

  setSelectedMedicalInformation(dialog: any){
    dialog.close();
  }

  hideMedicalInformationDialog(dialog: any){
    dialog.close();
  }

  showMedialInformationDialog(dialog: any, value:string){
    dialog.open();
    this.emitSelection(value);
  }

  private error(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
