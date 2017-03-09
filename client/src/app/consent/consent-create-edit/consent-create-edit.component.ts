import {Component, OnInit} from '@angular/core';

import {ConsentService} from "../shared/consent.service";
import {ActivatedRoute} from "@angular/router";
import {UtilityService} from "../../shared/utility.service";
import {ConsentCreateEdit} from "../shared/consent-create-edit.model";
import {Provider} from "../shared/Provider.model";
import {SensitivityPolicy} from "../shared/sensitivity-policy";
import {PurposeOfUseBase} from "../shared/purpose-of-use-base.model";
import {NotificationService} from "../../core/notification.service";

@Component({
  selector: 'c2s-consent-create-edit',
  templateUrl: './consent-create-edit.component.html',
  styleUrls: ['./consent-create-edit.component.css']
})
export class ConsentCreateEditComponent implements OnInit {
  consent : ConsentCreateEdit;
  providers: Provider[];
  sensitivityPolicies: SensitivityPolicy[];
  purposeOfUses: PurposeOfUseBase[];
  title: string = "Create Consent";
  private consentId:string;

  constructor(private consentService: ConsentService, private notificationService: NotificationService, private route: ActivatedRoute, private utilityService:UtilityService) {
  }

  ngOnInit() {

    this.providers = this.route.snapshot.data['providers'];
    this.sensitivityPolicies = this.route.snapshot.data['sensitivityPolicies'];
    this.purposeOfUses = this.route.snapshot.data['purposeOfUses'];

    this.consent = new ConsentCreateEdit();
    this.consent.consentStart = "";
    this.consent.consentEnd = "";
    this.consent.shareForPurposeOfUseCodes = ['TREATMENT'];
    this.consent.doNotShareSensitivityPolicyCodes = [];
    this.consent.organizationalProvidersDisclosureIsMadeToNpi = [];
    this.consent.organizationalProvidersPermittedToDiscloseNpi = [];
    this.consent.providersDisclosureIsMadeToNpi = [];
    this.consent.providersPermittedToDiscloseNpi = [];

    this.route.params.subscribe(params => {

      if (params['consentId']) { // Edit mode
        this.title = "Edit Consent";
        this.consent = this.route.snapshot.data['consent'];
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

       this.consentService.updateConsent(this.consent)
                          .then(res => {
                            this.notificationService.show("Success in Updating consent.");
                            this.utilityService.navigateTo('consent-list');
                          })
                          .catch(error => {
                            this.notificationService.show("Error in Updating consent.");
                            console.log(error);
                          });
    }else {
       this.consentService.createConsent(this.consent)
                        .then(res => {
                          this.notificationService.show("Success in creating consent.");
                          this.utilityService.navigateTo('consent-list');
                        })
                        .catch(error => {
                          this.notificationService.show("Error in creating consent.");
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
