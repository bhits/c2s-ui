import {Component, OnInit} from '@angular/core';

import {MedicalInformation} from "../shared/medical-information.enum";
import {ConsentService} from "../shared/consent.service";
import {Md2Toast} from "md2";
import {ActivatedRoute} from "@angular/router";
import {UtilityService} from "../../shared/utility.service";
import {Consent} from "../shared/consent";
import {Provider} from "../shared/Provider";
import {EditConsent} from "../shared/EditConsent";
import {SensitivityPolicy} from "../shared/sensitivity-policy";
import {PurposeOfUse} from "../shared/purpose-of-use";

@Component({
  selector: 'c2s-consent-create-edit',
  templateUrl: './consent-create-edit.component.html',
  styleUrls: ['./consent-create-edit.component.css']
})
export class ConsentCreateEditComponent implements OnInit {
  consent : Consent;
  providers: Provider[];
  sensitivityPolicies: SensitivityPolicy[];
  purposeOfUses: PurposeOfUse[];

  private consentId:string;

  constructor(private consentService: ConsentService, private toast: Md2Toast, private route: ActivatedRoute, private utilityService:UtilityService) {
  }

  ngOnInit() {

    this.providers = this.route.snapshot.data['providers'];
    this.sensitivityPolicies = this.route.snapshot.data['sensitivityPolicies'];
    this.purposeOfUses = this.route.snapshot.data['purposeOfUses'];

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
      }
    });
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

       let editConsent = new EditConsent();
       editConsent.id= this.consentId;
       editConsent.consentStart = this.consent.consentStart;
       editConsent.consentEnd = this.consent.consentEnd;
       editConsent.shareForPurposeOfUseCodes = this.consent.shareForPurposeOfUseCodes;
       editConsent.doNotShareSensitivityPolicyCodes = this.consent.doNotShareSensitivityPolicyCodes;
       editConsent.organizationalProvidersDisclosureIsMadeToNpi = this.consent.organizationalProvidersDisclosureIsMadeToNpi;
       editConsent.organizationalProvidersPermittedToDiscloseNpi = this.consent.organizationalProvidersPermittedToDiscloseNpi;
       editConsent.providersDisclosureIsMadeToNpi = this.consent.providersDisclosureIsMadeToNpi;
       editConsent.providersPermittedToDiscloseNpi = this.consent.providersPermittedToDiscloseNpi;


       this.consentService.updateConsent(editConsent)
                          .then(res => {
                            this.toast.show("Success in Updating consent.", 2000);
                            this.utilityService.navigateTo('consent-list');
                          })
                          .catch(error => {
                            this.toast.show("Error in Updating consent.", 2000);
                            console.log(error);
                          });
    }else {
       this.consentService.createConsent(this.consent)
                        .then(res => {
                          this.toast.show("Success in creating consent.", 2000);
                          this.utilityService.navigateTo('consent-list');
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

  navigateTo(url: string){
    this.utilityService.navigateTo(url);
  }

}
