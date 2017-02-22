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
      'medicalInformation' : 'A',
    };
  }

  ngOnInit() {
  }

  onSelectMedicalInformation(event: any){
    this.consent['medicalInformation'] = event;
  }
  submitForm(){
    console.log(this.consent);
  }

}
