import {Component, OnInit} from '@angular/core';

import {ConsentService} from "../shared/consent.service";
import {ActivatedRoute} from "@angular/router";
import {UtilityService} from "../../shared/utility.service";
import {ConsentCreateEdit} from "../shared/consent-create-edit.model";
import {SensitivityPolicy} from "../shared/sensitivity-policy";
import {PurposeOfUseBase} from "../shared/purpose-of-use-base.model";
import {NotificationService} from "../../core/notification.service";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";
import {GlobalEventManagerService} from "../../core/global-event-manager.service";
import {Profile} from "../../core/profile.model";

@Component({
  selector: 'c2s-consent-create-edit',
  templateUrl: './consent-create-edit.component.html',
  styleUrls: ['./consent-create-edit.component.css']
})
export class ConsentCreateEditComponent implements OnInit {
  private consent : ConsentCreateEdit;
  private providers: FlattenedSmallProvider[];
  private sensitivityPolicies: SensitivityPolicy[];
  private purposeOfUses: PurposeOfUseBase[];

  private title: string = "Create Consent";
  private consentId:string;
  private profile: Profile;

  constructor(private consentService: ConsentService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private utilityService:UtilityService,
              private globalEventManagerService: GlobalEventManagerService) {

    this.consentService.getConsentEmitter().subscribe((consent)=>{
      if (consent) {
        this.consent = consent;
      }
    });

    this.globalEventManagerService.getUserProfileEmitter().subscribe((profile)=>{
      if (profile) {
        this.profile = profile;
      }
    });
  }

  ngOnInit() {
    this.providers = this.route.snapshot.data['providers'];
    this.sensitivityPolicies = this.route.snapshot.data['sensitivityPolicies'];
    this.purposeOfUses = this.route.snapshot.data['purposeOfUses'];

    this.consent = new ConsentCreateEdit();

    this.route.params.subscribe(params => {

      if (params['consentId']) { // Edit mode
        this.title = "Edit Consent";
        this.consent = this.route.snapshot.data['consent'];
      }
      this.consentService.setConsent(this.consent);
    });


  }
  onSelectMedicalInformation(shareSensitivityCategories: any){
    this.consent.shareSensitivityCategories = shareSensitivityCategories;
    console.log(this.consent);
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
      console.log(this.consent);
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

  navigateTo(url: string){
    this.utilityService.navigateTo(url);
  }
}
