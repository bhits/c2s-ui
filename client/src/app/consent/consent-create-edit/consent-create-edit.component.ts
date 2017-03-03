import {Component, OnInit} from '@angular/core';

import {MedicalInformation} from "../shared/medical-information.enum";
import {ConsentService} from "../shared/consent.service";
import {Md2Toast} from "md2";
import {ActivatedRoute} from "@angular/router";
import {UtilityService} from "../../shared/utility.service";
import {Consent} from "../shared/consent";
import {Provider} from "../shared/Provider";

@Component({
  selector: 'c2s-consent-create-edit',
  templateUrl: './consent-create-edit.component.html',
  styleUrls: ['./consent-create-edit.component.css']
})
export class ConsentCreateEditComponent implements OnInit {
  consent : Consent;
  providers: Provider[];
  private isShareAll:string;
  private consentId:string;
  constructor(private consentService: ConsentService, private toast: Md2Toast, private route: ActivatedRoute, private utilityService:UtilityService) {

  }

  ngOnInit() {

    this.consent = {
      consentEnd:"",
      consentStart:"",
      doNotShareSensitivityPolicyCodes:[],
      organizationalProvidersDisclosureIsMadeToNpi:[],
      organizationalProvidersPermittedToDiscloseNpi:[],
      providersDisclosureIsMadeToNpi:[],
      providersPermittedToDiscloseNpi:[],
      shareForPurposeOfUseCodes:['TREATMENT']
    };

    this.isShareAll = this.getMedicalInformationStatus();

    this.providers = this.route.snapshot.data['providers'];

    this.route.params.subscribe(params => {

      if (params['consentId']) { // Edit mode
        let tempConsent = this.route.snapshot.data['consent'];
        this.consentId = params['consentId'];
        this.consent.consentStart = tempConsent.consentStart;
        this.consent.consentEnd = tempConsent.consentEnd;
        this.consent.shareForPurposeOfUseCodes = tempConsent.shareForPurposeOfUseCodes;
        this.consent.doNotShareSensitivityPolicyCodes = tempConsent.doNotShareSensitivityPolicyCodes;
        this.consent.organizationalProvidersDisclosureIsMadeToNpi = tempConsent.organizationalProvidersDisclosureIsMadeToNpi;
        this.consent.organizationalProvidersPermittedToDiscloseNpi = tempConsent.organizationalProvidersPermittedToDiscloseNpi;
        this.consent.providersDisclosureIsMadeToNpi = tempConsent.providersDisclosureIsMadeToNpi;
        this.consent.providersPermittedToDiscloseNpi = tempConsent.providersPermittedToDiscloseNpi;

        this.isShareAll = this.getMedicalInformationStatus();
      }
    });
  }

  private getMedicalInformationStatus():string {
    return this.consent.doNotShareSensitivityPolicyCodes.length === 0?
      MedicalInformation.SHAREALL.toString(): MedicalInformation.DONOTSHAREALL.toString();

  }
  onSelectMedicalInformation(event: any){
    this.consent.doNotShareSensitivityPolicyCodes = event;
  }

  onStartDateChange(event: any){
    this.consent.consentStart = event;
  }

  onEndDateChange(event: any){
    this.consent.consentEnd = event;
  }

  submitForm(){
    if(this.consentId){
      this.consent['id']= this.consentId;
      this.consentService.updateConsent(this.consent)
                          .then(res => {
                            this.toast.show("Success in Updating consent.", 2000);
                            console.log(res);
                          })
                          .catch(error => {
                            this.toast.show("Error in Updating consent.", 2000);
                            console.log(error);
                          });
    }else {
      this.consentService.createConsent(this.consent)
                        .then(res => {
                          this.toast.show("Success in creating consent.", 2000);
                          console.log(res);
                        })
                        .catch(error => {
                          this.toast.show("Error in creating consent.", 2000);
                          console.log(error);
                        });
    }


  }

  onSelectedPurposeOfUse(event: any){
    this.consent.shareForPurposeOfUseCodes = event;
  }

}
