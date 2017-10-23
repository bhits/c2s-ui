import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {ConsentService} from "../shared/consent.service";
import "rxjs/add/operator/toPromise";
import {ConsentProvider, Identifier, ListOfIdentifiers} from "c2s-ng-shared";
import {Consent} from "../shared/consent.model";
import {UtilityService} from "../../core/utility.service";


@Component({
  selector: 'c2s-select-provider',
  templateUrl: './select-provider.component.html',
  styleUrls: ['select-provider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectProviderComponent implements OnInit {
  @Input() providers: ConsentProvider[];
  @Input() title: string;
  @Input() dialogTitle: string;
  @Input() isAuthorizedProviders: boolean;
  selectedProviders: ConsentProvider[];
  localeProviders: ConsentProvider[];

  consent: Consent;

  constructor(private consentService: ConsentService, private utilityService: UtilityService) {
    this.consentService.getConsentEmitter().subscribe((consent) => {
      if (consent) {
        this.consent = consent;
      }
    });
  }

  ngOnInit() {
    this.setSelectedProvider();
  }

  setSelectedProvider() {
    this.localeProviders = this.utilityService.copyObject(this.providers);
    if (this.isAuthorizedProviders &&
      (this.consent.fromProviders.identifiers) &&
      (this.consent.fromProviders.identifiers.length > 0)) {
      this.consentService.markSelectedProvidersAsChecked(this.localeProviders, this.consent.fromProviders.identifiers);
      this.selectedProviders = this.utilityService.copyObject(this.localeProviders);
    } else if ((!this.isAuthorizedProviders) &&
      (this.consent.toProviders.identifiers) &&
      (this.consent.toProviders.identifiers.length > 0)) {
      this.consentService.markSelectedProvidersAsChecked(this.localeProviders, this.consent.toProviders.identifiers);
      this.selectedProviders = this.utilityService.copyObject(this.localeProviders);
    }
  }

  openDialog(dialog: any) {
    dialog.open();
  }

  closeDialog(dialog: any) {
    dialog.close();
  }

  onAddSelectedProviders(dialog: any) {
    this.selectedProviders = this.utilityService.copyObject(this.localeProviders);
    if (this.isAuthorizedProviders) {
      this.consent.fromProviders = this.consentService.createListOfIdentifiers(this.localeProviders);
      this.consentService.setConsent(this.consent);
    } else if (!this.isAuthorizedProviders) {
      this.consent.toProviders = this.consentService.createListOfIdentifiers(this.localeProviders);
      this.consentService.setConsent(this.consent);
    }
    dialog.close();
  }

  isDisabled(provider: ConsentProvider): boolean {
    if ((this.isAuthorizedProviders) && this.consent.toProviders
      && this.consent.toProviders.identifiers && this.consent.toProviders.identifiers.length >0) {
      return  this.consentService.isInList(this.consent.toProviders.identifiers, provider.identifiers);
    } else if ((!this.isAuthorizedProviders) && this.consent.fromProviders &&
      this.consent.fromProviders.identifiers && this.consent.fromProviders.identifiers.length >0) {
      return this.consentService.isInList(this.consent.fromProviders.identifiers, provider.identifiers);
    }
    return false;
  }

  deselectAll(){
    this.localeProviders.forEach(provider =>{
      provider['selected'] = false;
    })
  }
}
