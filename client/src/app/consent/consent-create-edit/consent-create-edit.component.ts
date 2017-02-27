import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'c2s-consent-create-edit',
  templateUrl: './consent-create-edit.component.html',
  styleUrls: ['./consent-create-edit.component.css']
})
export class ConsentCreateEditComponent implements OnInit {
  consent : any;

  constructor() {
    this.consent = {
      medicalInformation : 'A',
      startDate:'',
      endDate:'',
      shareForPurposeOfUseCodes:["TREATMENT", "RESEARCH"],
      purposeOfUseCodesAndValues:{}
    };
  }

  ngOnInit() {
  }

  onSelectMedicalInformation(event: any){
    this.consent['medicalInformation'] = event;
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
