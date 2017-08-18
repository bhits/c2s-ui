import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ConsentService} from "../shared/consent.service";
import {UtilityService} from "../../shared/utility.service";
import {Consent} from "../shared/consent.model";
import {SensitivityPolicy} from "../shared/sensitivity-policy";
import {NotificationService} from "../../core/notification.service";
import {SharePurpose} from "../shared/share-purpose.model";
import {ConsentProvider} from "../../shared/consent-provider.model";
import {LimitedProfileService} from "../../security/shared/limited-profile.service";


@Component({
  selector: 'c2s-consent-create-edit',
  templateUrl: './consent-create-edit.component.html',
  styleUrls: ['consent-create-edit.component.scss']
})
export class ConsentCreateEditComponent implements OnInit {
  consent: Consent;
  providers: ConsentProvider[];
  sensitivityPolicies: SensitivityPolicy[];
  purposeOfUses: SharePurpose[];
  username: any;
  title: string = "Create Consent";
  consentId: string;

  constructor(private consentService: ConsentService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private utilityService: UtilityService,
              private limitedProfileService: LimitedProfileService) {

    this.consentService.getConsentEmitter().subscribe((consent) => {
      if (consent) {
        this.consent = consent;
      }
    });

    let fullName: string = this.limitedProfileService.getFullName();
    this.username = {name: fullName};
  }

  ngOnInit() {
    this.providers = this.route.snapshot.data['providers'];
    this.sensitivityPolicies = this.route.snapshot.data['sensitivityPolicies'];
    this.purposeOfUses = this.route.snapshot.data['purposeOfUses'];

    this.consent = new Consent();
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
      this.consentService.updateConsent(this.consent)
        .subscribe(
          () => {
            this.notificationService.i18nShow('NOTIFICATION_MSG.SUCCESS_UPDATING_CONSENT');
            this.utilityService.navigateTo('consent-list');
          },
          err => {
            this.notificationService.i18nShow('NOTIFICATION_MSG.FAILED_UPDATING_CONSENT');
            console.log(err);
          }
        );
    } else {
      this.consentService.createConsent(this.consent)
        .subscribe(
          () => {
            this.notificationService.i18nShow('NOTIFICATION_MSG.SUCCESS_CREATING_CONSENT');
            this.utilityService.navigateTo('consent-list');
          },
          err => {
            this.consentService.handleCreateConsentError(err);
            console.log(err);
          }
        );
    }
  }

  navigateTo(url: string) {
    this.utilityService.navigateTo(url);
  }

  canSave(): boolean {
    let result = false;
    if (!this.utilityService.isDefined(this.consent.fromProviders.identifiers) ||
      this.consent.fromProviders.identifiers.length == 0) {
      result = true;
    }
    else if (!this.utilityService.isDefined(this.consent.toProviders.identifiers) ||
      this.consent.toProviders.identifiers.length == 0) {
      result = true;
    }
    else if (!this.utilityService.isDefined(this.consent.shareSensitivityCategories.identifiers) ||
      this.consent.shareSensitivityCategories.identifiers.length == 0) {
      return true;
    }
    else if (!this.utilityService.isDefined(this.consent.sharePurposes.identifiers) ||
      this.consent.sharePurposes.identifiers.length == 0) {
      return true;
    }
    else if ((this.consent.startDate === null) || !this.utilityService.isDefined(this.consent.startDate)) {
      return true;
    } else if ((this.consent.endDate === null) || !this.utilityService.isDefined(this.consent.endDate)) {
      return true;
    }

    return result
  }
}
