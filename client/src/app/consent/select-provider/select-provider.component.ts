import {Component, Input, OnInit} from "@angular/core";
import {ConsentService} from "../shared/consent.service";
import "rxjs/add/operator/toPromise";
import {ListOfIdentifiers} from "../../shared/list-of-identifiers.model";
import {Identifier} from "../../shared/identifier.model";
import {Consent} from "../shared/consent.model";
import {ConsentProvider} from "../../shared/consent-provider.model";


@Component({
  selector: 'c2s-select-provider',
  templateUrl: './select-provider.component.html',
  styleUrls: ['select-provider.component.scss']
})
export class SelectProviderComponent implements OnInit {
  @Input() providers: ConsentProvider[];
  @Input() title: string;
  @Input() dialogTitle: string;
  @Input() isAuthorizedProviders: boolean;
  @Input() selectedProviders: ConsentProvider[] = null;

  consent: Consent;
  selectedProviderNpi: string;
  selectedProvider: ConsentProvider;

  constructor(private consentService: ConsentService) {
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
    if (this.isAuthorizedProviders &&
      (this.consent.fromProviders.identifiers) &&
      (this.consent.fromProviders.identifiers.length > 0)) {
      this.selectedProvider = this.consentService.getProviderByNPI(this.providers, this.consent.fromProviders.identifiers[0].value);
    } else if ((!this.isAuthorizedProviders) &&
      (this.consent.toProviders.identifiers) &&
      (this.consent.toProviders.identifiers.length > 0)) {
      this.selectedProvider = this.consentService.getProviderByNPI(this.providers, this.consent.toProviders.identifiers[0].value);
    }
  }

  openDialog(dialog: any) {
    dialog.open();
  }

  closeDialog(dialog: any) {
    dialog.close();
  }

  onAddSelectedProviders(dialog: any) {
    this.selectedProvider = this.consentService.getProviderByNPI(this.providers, this.selectedProviderNpi);
    if (this.isAuthorizedProviders) {
      this.consent.fromProviders = this.createListOfIdentifiers(this.selectedProvider);
      this.consentService.setConsent(this.consent);
    } else if (!this.isAuthorizedProviders) {
      this.consent.toProviders = this.createListOfIdentifiers(this.selectedProvider);
      this.consentService.setConsent(this.consent);
    }
    dialog.close();
  }

  isSelected(npi: string): boolean {
    if ((this.isAuthorizedProviders) && this.consent.toProviders
      && this.consent.toProviders.identifiers && this.consent.toProviders.identifiers[0]) {
      return (this.consent.toProviders.identifiers[0].value === npi);
    } else if ((!this.isAuthorizedProviders) && this.consent.fromProviders &&
      this.consent.fromProviders.identifiers && this.consent.fromProviders.identifiers[0]) {
      return (this.consent.fromProviders.identifiers[0].value === npi);
    }
    return false;
  }

  private createListOfIdentifiers(selectedProvider: ConsentProvider) {
    let provider = new ListOfIdentifiers([new Identifier(null, null)]);
    if (selectedProvider) {
      provider.identifiers = [new Identifier(selectedProvider.identifiers[0].system, selectedProvider.identifiers[0].value)];
    }
    return provider;
  }
}
