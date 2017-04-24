import {Component, OnInit} from "@angular/core";

import {ConsentService} from "../shared/consent.service";
import {ActivatedRoute} from "@angular/router";
import {UtilityService} from "../../shared/utility.service";
import {ConsentCreateEdit} from "../shared/consent-create-edit.model";
import {SensitivityPolicy} from "../shared/sensitivity-policy";
import {NotificationService} from "../../core/notification.service";
import {GlobalEventManagerService} from "../../core/global-event-manager.service";
import {Profile} from "../../core/profile.model";
import {SharePurpose} from "../shared/share-purpose.model";
import {ConsentProvider} from "../../shared/consent-provider.model";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'c2s-consent-create-edit',
  templateUrl: './consent-create-edit.component.html',
  styleUrls: ['./consent-create-edit.component.css']
})
export class ConsentCreateEditComponent implements OnInit {
  consent: ConsentCreateEdit;
  providers: ConsentProvider[];
  sensitivityPolicies: SensitivityPolicy[];
  purposeOfUses: SharePurpose[];
  username:any;

  title: string = "Create Consent";
  consentId: string;
  profile: Profile;

  constructor(private consentService: ConsentService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private utilityService: UtilityService,
              private globalEventManagerService: GlobalEventManagerService,
              private translate: TranslateService) {

    this.consentService.getConsentEmitter().subscribe((consent) => {
      if (consent) {
        this.consent = consent;
      }
    });

    this.globalEventManagerService.getUserProfileEmitter().subscribe((profile) => {
      if (profile) {
        this.profile = profile;
        this.username = {name: profile.name}
      }
    });
  }

  ngOnInit() {
    this.providers = this.route.snapshot.data['providers'];
    this.sensitivityPolicies = this.route.snapshot.data['sensitivityPolicies'];
    this.purposeOfUses = this.route.snapshot.data['purposeOfUses'];

    this.consent = new ConsentCreateEdit();
    this.consentService.setConsent(this.consent);

    this.route.params.subscribe(params => {

      if (params['consentId']) { // Edit mode
        this.title = "Edit Consent";
        this.consent = this.route.snapshot.data['consent'];
      }
      this.consentService.setConsent(this.consent);
    });


  }

  submitForm() {
    if (this.consent.id) {
      console.log(this.consent);
      this.consentService.updateConsent(this.consent)
        .subscribe(
          () => {
            this.notificationService.show("Success in Updating consent.");
            this.utilityService.navigateTo('consent-list');
          },
          err => {
            this.notificationService.show("Error in Updating consent.");
            console.log(err);
          }
        );
    } else {
      this.consentService.createConsent(this.consent)
        .subscribe(
          () => {
            this.notificationService.show("Success in creating consent.");
            this.utilityService.navigateTo('consent-list');
          },
          err => {
            this.notificationService.show("Error in creating consent.");
            console.log(err);
          }
        );
    }
  }

  navigateTo(url: string) {
    this.utilityService.navigateTo(url);
  }

  canSave(): boolean{
    let result = false;
    if(!this.utilityService.isDefined(this.consent.fromProviders.identifiers) ||
      this.consent.fromProviders.identifiers.length == 0){
      result =  true;
    }
    else if(!this.utilityService.isDefined(this.consent.toProviders.identifiers) ||
              this.consent.toProviders.identifiers.length == 0){
      result =  true;
    }
    else if(!this.utilityService.isDefined(this.consent.shareSensitivityCategories.identifiers) ||
              this.consent.shareSensitivityCategories.identifiers.length == 0){
      return true;
    }
    else if(!this.utilityService.isDefined(this.consent.sharePurposes.identifiers) ||
              this.consent.sharePurposes.identifiers.length == 0){
      return true;
    }
    else if((this.consent.startDate === null) ||  !this.utilityService.isDefined(this.consent.startDate)){
      return true;
    } else if((this.consent.endDate === null) || !this.utilityService.isDefined(this.consent.endDate)){
      return true;
    }

    return result
  }
}
