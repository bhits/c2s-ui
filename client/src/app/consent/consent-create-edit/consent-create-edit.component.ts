import {Component, OnInit} from '@angular/core';

import {MedicalInformation} from "../shared/medical-information.enum";

@Component({
  selector: 'c2s-consent-create-edit',
  templateUrl: './consent-create-edit.component.html',
  styleUrls: ['./consent-create-edit.component.css']
})
export class ConsentCreateEditComponent implements OnInit {
  consent : any;
  private isShareAll:string;
  constructor() {

  }

  ngOnInit() {
    this.consent = {
      startDate:'',
      endDate:'',
      shareForPurposeOfUseCodes:["TREATMENT", "RESEARCH"],
      purposeOfUseCodesAndValues:{},
      doNotShareSensitivityPolicyCodes:[],
      organizationalProvidersDisclosureIsMadeToNpi:[],
      organizationalProvidersPermittedToDiscloseNpi:[]
    };
    this.isShareAll = this.getMedicalInformationStatus();
  }

  private getMedicalInformationStatus():string {
    return this.consent.doNotShareSensitivityPolicyCodes.length === 0?
        MedicalInformation.SHAREALL.toString(): MedicalInformation.DONOTSHAREALL.toString();
  }
  onSelectMedicalInformation(event: any){
    this.consent['doNotShareSensitivityPolicyCodes'] = event;
    console.log(this.consent);
  }

  onStartDateChange(event: any){
    this.consent['startDate'] = event;
    console.log(this.consent);
  }

  onEndDateChange(event: any){
    this.consent['endDate'] = event;
    console.log(this.consent);
  }

  submitForm(){
    console.log(this.consent);
  }

  onSelectedPurposeOfUse(event: any){
    this.consent['shareForPurposeOfUseCodes'] = event;
    console.log(this.consent);
  }
}
