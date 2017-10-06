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
  selectedProviderNpi: string[];
  newlySelectedProviders: ConsentProvider[];

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
        this.newlySelectedProviders = this.consentService.getProvidersByIdentifier(this.providers, this.consent.fromProviders);
    } else if ((!this.isAuthorizedProviders) &&
      (this.consent.toProviders.identifiers) &&
      (this.consent.toProviders.identifiers.length > 0)) {
      this.newlySelectedProviders = this.consentService.getProvidersByIdentifier(this.providers, this.consent.toProviders);
    }
  }

  openDialog(dialog: any) {
    dialog.open();
  }

  closeDialog(dialog: any) {
    dialog.close();
  }

  private getSelectedProviders(newlSelectedProviders:any[]):ConsentProvider[]{
    let providers:ConsentProvider[] = [];
    newlSelectedProviders.forEach(item =>{
      providers.push(item.value)
    });
    return providers;
  }

  onAddSelectedProviders(newlSelectedProviders:any[], dialog: any) {
    this.newlySelectedProviders = this.getSelectedProviders(newlSelectedProviders);
    if (this.isAuthorizedProviders) {
      this.consent.fromProviders = this.createListOfIdentifiers(this.newlySelectedProviders);
      this.consentService.setConsent(this.consent);
    } else if (!this.isAuthorizedProviders) {
      this.consent.toProviders = this.createListOfIdentifiers(this.newlySelectedProviders);
      this.consentService.setConsent(this.consent);
    }
    dialog.close();
  }

  isSelected(npi: string): boolean {
    if ((this.isAuthorizedProviders) && this.consent.toProviders
      && this.consent.toProviders.identifiers && this.consent.toProviders.identifiers[0]) {
      return  this.consentService.isSelected(this.consent.toProviders.identifiers, npi);
    } else if ((!this.isAuthorizedProviders) && this.consent.fromProviders &&
      this.consent.fromProviders.identifiers && this.consent.fromProviders.identifiers[0]) {
      return this.consentService.isSelected(this.consent.fromProviders.identifiers, npi);;
    }
    return false;
  }

  private createListOfIdentifiers(providers: ConsentProvider[]) {
    let listOfIdentifiers:ListOfIdentifiers = new ListOfIdentifiers([new Identifier(null, null)]);
    let identifies: Identifier[] = [];
    providers.forEach(provider=>{
      identifies.push(new Identifier(provider.identifiers[0].system, provider.identifiers[0].value));
    });
    listOfIdentifiers.identifiers = identifies;
    return listOfIdentifiers;
  }
}
